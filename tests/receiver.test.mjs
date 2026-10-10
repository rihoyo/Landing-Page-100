import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../apps-script/Code.gs', import.meta.url), 'utf8');
function receiver({ legacy = false, cacheEnabled = true, cacheThrows = false, routes = [] } = {}) {
  const rows = [];
  const cache = new Map();
  let scans = 0;
  let opens = 0;
  let lastRowReads = 0;
  const sheets = new Map();
  function makeSheet(rows) {
    return {
      getLastRow: () => {
        lastRowReads++;
        return rows.length;
      },
      appendRow: (row) => rows.push([...row]),
      setFrozenRows() {},
      getRange(row, column, count = 1, width = 1) {
        return {
          getValues: () =>
            Array.from({ length: count }, (_, i) =>
              Array.from({ length: width }, (_, j) => rows[row - 1 + i]?.[column - 1 + j] ?? ''),
            ),
          setValue(value) {
            rows[row - 1][column - 1] = value;
            return this;
          },
          setValues(values) {
            for (const [i, valuesRow] of values.entries()) rows[row - 1 + i] = [...valuesRow];
            return this;
          },
          setFontWeight() {
            return this;
          },
          setNumberFormat() {
            return this;
          },
          createTextFinder(value) {
            scans++;
            return {
              matchEntireCell() {
                return this;
              },
              findNext: () =>
                rows.slice(row - 1).some((r) => r[column - 1] === value) ? {} : null,
            };
          },
        };
      },
    };
  }
  const sheet = makeSheet(rows);
  const context = vm.createContext({
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (value) => ({
        value,
        setMimeType() {
          return this;
        },
      }),
    },
    SpreadsheetApp: {
      openById: (id) => {
        opens++;
        return {
          getSheetByName: (name) => {
            const key = `${id}:${name}`;
            if (name === '상담신청 테스트') return sheet;
            if (!sheets.has(key)) sheets.set(key, []);
            return makeSheet(sheets.get(key));
          },
        };
      },
      flush() {},
    },
    LockService: {
      getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock() {} }),
    },
    CacheService: {
      getScriptCache: () => {
        if (cacheThrows) throw new Error('Cache unavailable');
        return {
          get: (key) => (cacheEnabled ? cache.get(key) : null),
          put: (key, value) => cache.set(key, value),
        };
      },
    },
    Utilities: {
      formatDate: (_, __, format) => (format === 'yyyyMMdd' ? '20261010' : '2026-10-10 16:00:00'),
    },
  });
  vm.runInContext(
    source.replace(
      'const STORAGE_ROUTES = [',
      `const STORAGE_ROUTES = [${routes.map((r) => JSON.stringify(r)).join(',')}${routes.length ? ',' : ''}`,
    ),
    context,
  );
  if (legacy)
    rows.push(
      [...vm.runInContext('HEADERS.slice(0, -1)', context)],
      ['old row', 'existing-request', 'aa0001', '기존고객'],
    );
  const submit = (payload) =>
    JSON.parse(context.doPost({ postData: { contents: JSON.stringify(payload) } }).value);
  return {
    submit,
    rows,
    sheets,
    lastRowReads: () => lastRowReads,
    changeRoutes: (next) => {
      context.nextRoutes = next;
      vm.runInContext('STORAGE_ROUTES.splice(0, STORAGE_ROUTES.length, ...nextRoutes)', context);
    },
    scans: () => scans,
    opens: () => opens,
    status: () => JSON.parse(context.doGet().value),
  };
}
const payload = (pageId, requestId = 'test-request-123456789') => ({
  page_id: pageId,
  request_id: requestId,
  name: '테스트',
  phone: '01000000000',
  birth: '19900101',
  gender: '여자',
  agree: 'on',
  region: '서울',
  interest: ['건강보험'],
  message: '=HYPERLINK("https://example.com")',
});

test('aa0001, aa0002, aa0003 and future aa0004 share a single receiver', () => {
  const api = receiver();
  for (const id of ['aa0001', 'aa0002', 'aa0003', 'aa0004']) {
    const result = api.submit(payload(id, `test-request-${id}-123456`));
    assert.equal(result.ok, true);
    assert.equal(api.rows.at(-1)[2], id);
    assert.equal(api.rows.at(-1)[15], '서울');
  }
  assert.equal(api.status().version, 2);
  assert.equal(api.rows.length, 5);
});
test('a v1 sheet gains region without overwriting existing rows', () => {
  const api = receiver({ legacy: true });
  const before = [...api.rows[1]];
  assert.equal(api.submit(payload('aa0003')).ok, true);
  assert.deepEqual(api.rows[1], before);
  assert.equal(api.rows[0][15], '주거지역');
  assert.equal(api.rows[2][15], '서울');
});
test('confirmed retry uses the cache without reopening or scanning the sheet', () => {
  const api = receiver();
  assert.equal(api.submit(payload('aa0003')).ok, true);
  const opens = api.opens();
  assert.equal(api.submit(payload('aa0003')).duplicate, true);
  assert.equal(api.rows.length, 2);
  assert.equal(api.opens(), opens);
});
test('expired cache still deduplicates against persisted sheet data', () => {
  const api = receiver({ cacheEnabled: false });
  assert.equal(api.submit(payload('aa0003')).ok, true);
  assert.equal(api.submit(payload('aa0003')).duplicate, true);
  assert.equal(api.rows.length, 2);
  assert.equal(api.scans(), 1);
});
test('invalid page identifiers, consent and dates never append rows', () => {
  const api = receiver();
  for (const id of ['aa/0003', 'aa0000', 'unknown', 'aa00030'])
    assert.equal(api.submit(payload(id)).code, 'INVALID_PAGE_ID');
  assert.equal(api.submit({ ...payload('aa0003'), agree: '' }).code, 'CONSENT_REQUIRED');
  assert.equal(api.submit({ ...payload('aa0003'), birth: '20260230' }).code, 'INVALID_BIRTH');
  assert.equal(api.submit({ ...payload('aa0003'), website_alt: 'spam' }).code, 'INVALID_INPUT');
  assert.equal(api.rows.length, 0);
});
test('spreadsheet formulas are stored as inert text', () => {
  const api = receiver();
  api.submit(payload('aa0003'));
  assert(api.rows[1][11].startsWith("'="));
});

test('optional cache outage does not prevent saving or duplicate protection', () => {
  const api = receiver({ cacheThrows: true });
  assert.equal(api.submit(payload('aa0003')).ok, true);
  assert.equal(api.submit(payload('aa0003')).duplicate, true);
  assert.equal(api.rows.length, 2);
});
test('field-specific diagnostics distinguish invalid input from sheet failures', () => {
  const api = receiver();
  assert.equal(api.submit({ ...payload('aa0003'), phone: '1234' }).code, 'INVALID_PHONE');
  assert.equal(api.submit({ ...payload('aa0003'), name: 'A' }).code, 'INVALID_NAME');
  assert.equal(
    api.submit({ ...payload('aa0003'), request_id: 'short' }).code,
    'INVALID_REQUEST_ID',
  );
  api.rows.push(['wrong headers']);
  assert.equal(api.submit(payload('aa0003')).code, 'SHEET_HEADERS');
});

test('inclusive routing boundaries select tabs or another document and preserve default fallback', () => {
  const api = receiver({
    routes: [
      { from: 3, to: 20, sheetName: '건강보험 상담' },
      { from: 21, to: 50, spreadsheetId: 'other-document', sheetName: '별도 상담' },
    ],
  });
  for (const n of [1, 2, 3, 20, 21, 50, 51, 9999]) {
    const id = `aa${String(n).padStart(4, '0')}`;
    assert.equal(api.submit(payload(id, `route-test-${id}-123456`)).ok, true);
  }
  assert.deepEqual(
    api.rows.slice(1).map((r) => r[2]),
    ['aa0001', 'aa0002', 'aa0051', 'aa9999'],
  );
  const first = [...api.sheets.values()][0];
  assert.deepEqual(
    first.slice(1).map((r) => r[2]),
    ['aa0003', 'aa0020'],
  );
  assert.deepEqual(
    api.sheets
      .get('other-document:별도 상담')
      .slice(1)
      .map((r) => r[2]),
    ['aa0021', 'aa0050'],
  );
});
test('overlapping and invalid routing configuration fail before opening a document', () => {
  for (const routes of [
    [
      { from: 3, to: 20, sheetName: 'A' },
      { from: 20, to: 30, sheetName: 'B' },
    ],
    [{ from: 0, to: 20, sheetName: 'A' }],
    [{ from: 20, to: 3, sheetName: 'A' }],
    [{ from: 3, to: 10000, sheetName: 'A' }],
    [{ from: 3, to: 20, sheetName: ' ' }],
  ]) {
    const api = receiver({ routes });
    assert.equal(api.submit(payload('aa0003')).code, 'ROUTING_CONFIG');
    assert.equal(api.opens(), 0);
  }
});
test('routing change does not reuse a success cached for the previous destination', () => {
  const api = receiver();
  assert.equal(api.submit(payload('aa0003')).ok, true);
  api.changeRoutes([{ from: 3, to: 3, sheetName: '새 저장 위치' }]);
  assert.equal(api.submit(payload('aa0003')).duplicate, undefined);
  assert.equal([...api.sheets.values()][0].length, 2);
  assert.equal(api.submit(payload('aa0003')).duplicate, true);
});

test('each new submission reads the last row once, and cached retries do not read it', () => {
  const api = receiver();
  assert.equal(api.submit(payload('aa0003', 'row-read-request-0001')).ok, true);
  assert.equal(api.lastRowReads(), 1);
  assert.equal(api.submit(payload('aa0003', 'row-read-request-0002')).ok, true);
  assert.equal(api.lastRowReads(), 2);
  assert.equal(api.submit(payload('aa0003', 'row-read-request-0002')).duplicate, true);
  assert.equal(api.lastRowReads(), 2);
});
