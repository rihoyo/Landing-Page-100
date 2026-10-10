// Code.gs 전체를 교체하고, 기존 웹 앱 배포를 '새 버전'으로 업데이트하세요.
// 처리 순서: 입력 검사 → 저장 위치 선택 → 중복 확인 → 시트 저장 → 성공 응답

// ─── 1. 운영자가 수정하는 설정 ───────────────────────────────

// 기본 저장 문서: Google Sheets 주소의 /d/ 다음에 있는 ID입니다.
const SPREADSHEET_ID = '1ME5SZBoiaKSQRlnuHxkO_7-4HtM_KqMf8HwnW5fvOdk';
const SHEET_NAME = '상담신청 테스트'; // 문서 아래쪽에 표시되는 탭 이름

// 랜딩 번호 범위별 저장 위치. 비워두면 모두 위 기본 시트에 저장합니다.
// from/to는 양끝을 포함합니다. 예: 3~20 → aa0003부터 aa0020까지.
// spreadsheetId를 생략하면 기본 문서 안의 다른 탭에 저장합니다.
// 다른 문서를 쓰려면 실행 계정에 해당 문서의 편집 권한이 있어야 합니다.
// 범위가 겹치거나 설정이 틀리면 저장을 중단합니다. 기존 데이터는 이동하지 않습니다.
const STORAGE_ROUTES = [
  // { from: 3, to: 20, sheetName: '건강보험 상담' },
  // { from: 21, to: 50, spreadsheetId: '다른_문서_ID', sheetName: '별도 상담' },
];

// 허용 형식: aa0001~aa9999. aa0000, aa/0003, AA0003은 거부합니다.
// ^: 시작 / aa: 고정 글자 / (?!0000$): 0000 제외 / \d{4}: 숫자 4자리 / $: 끝
const PAGE_ID_PATTERN = /^aa(?!0000$)\d{4}$/;

// 열 순서입니다. 기존 데이터가 있다면 순서를 바꾸지 마세요.
const HEADERS = [
  '접수시간', '요청번호', '랜딩번호', '이름',
  '연락처', '생년월일', '나이', '성별',
  '상담시간', '연령대', '관심상품', '문의내용',
  '동의여부', '유입소스', '유입캠페인', '주거지역',
];

// ─── 2. 웹 앱 진입점 ────────────────────────────────────────

/** [1] API 주소를 브라우저로 열었을 때 서비스 상태를 보여줍니다. 저장하지 않습니다. */
function doGet() {
  return jsonResponse({
    ok: true,
    service: 'landing-consultation',
    version: 2,
    page_id_pattern: 'aaNNNN',
    fields: ['region'],
    routing: 'page-number-range',
  });
}

/** [2] 신청을 받아 검사하고, 지정된 시트에 한 번만 저장합니다. */
function doPost(e) {
  let lock;
  try {
    const p = readSubmission(e);
    const target = selectStorage(p.page_id);
    const targetKey = JSON.stringify([target.spreadsheetId, target.sheetName]);
    const cache = requestCache();
    const cacheKey = 'consult:' + p.page_id + ':' + p.request_id;

    // 같은 랜딩·요청번호·저장 위치의 성공 기록만 재사용합니다.
    if (cachedRequest(cache, cacheKey, targetKey)) return receipt(p, true);

    // 동시에 여러 신청이 와도 같은 행에 덮어쓰지 않도록 순서대로 처리합니다.
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    if (cachedRequest(cache, cacheKey, targetKey)) return receipt(p, true);

    const sheet = openSheet(target);
    prepareHeaders(sheet);
    if (alreadySaved(sheet, p.request_id)) {
      rememberRequest(cache, cacheKey, targetKey);
      return receipt(p, true);
    }

    writeSubmission(sheet, p);
    SpreadsheetApp.flush(); // 실제 쓰기 완료 후에만 성공 응답을 보냅니다.
    rememberRequest(cache, cacheKey, targetKey);
    return receipt(p, false);
  } catch (error) {
    return failureResponse(error);
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

// ─── 3. 입력 검사와 저장 위치 선택 ──────────────────────────

/** [3] JSON, 이름, 전화번호, 생년월일, 필수 동의를 검사합니다. */
function readSubmission(e) {
  if (!e || !e.postData || e.postData.contents.length > 20000) throw new Error('invalid');
  let p;
  try {
    p = JSON.parse(e.postData.contents);
  } catch (_) {
    throw new Error('invalid');
  }
  if (!p || typeof p !== 'object' || Array.isArray(p)) throw new Error('invalid');
  if (!PAGE_ID_PATTERN.test(String(p.page_id || ''))) throw new Error('page_id');
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(p.request_id || '')) throw new Error('request_id');
  if (!/^[가-힣a-zA-Z]{2,40}$/.test(p.name || '')) throw new Error('name');

  // 전화번호의 하이픈·공백을 제거하고 국내 번호 형식을 검사합니다.
  const phone = String(p.phone || '').replace(/[^0-9]/g, '');
  if (!/^(?:02\d{7,8}|0(?:31|32|33|41|42|43|44|51|52|53|54|55|61|62|63|64)\d{7,8}|01[016789]\d{8}|070\d{8}|050[2-8]\d{7})$/.test(phone)) throw new Error('phone');

  // website_alt는 사람이 입력하지 않는 스팸 차단용 숨김 칸입니다.
  if (!['on', true, 'true'].includes(p.agree)) throw new Error('consent');
  if (p.website_alt) throw new Error('invalid');

  // 생년월일이 없으면 나이도 빈칸으로 둡니다.
  const birth = String(p.birth || '');
  const age = birth ? serverAge(birth) : '';
  if (birth && age === null) throw new Error('birth');

  return Object.assign({}, p, { phone, birth, age });
}

/** [4] 랜딩 번호가 속한 범위의 문서·탭을 고릅니다. 미지정 번호는 기본 위치입니다. */
function selectStorage(pageId) {
  const number = Number(pageId.slice(2));
  const routes = STORAGE_ROUTES.map(function (route) {
    if (!route || !Number.isInteger(route.from) || !Number.isInteger(route.to) ||
        route.from < 1 || route.to > 9999 || route.from > route.to ||
        typeof route.sheetName !== 'string' || !route.sheetName.trim() ||
        (route.spreadsheetId !== undefined &&
         (typeof route.spreadsheetId !== 'string' || !route.spreadsheetId.trim()))) {
      throw new Error('routing');
    }
    return route;
  }).sort(function (a, b) { return a.from - b.from; });

  for (let i = 1; i < routes.length; i++) {
    if (routes[i].from <= routes[i - 1].to) throw new Error('routing');
  }
  const match = routes.find(function (route) {
    return number >= route.from && number <= route.to;
  });
  return {
    spreadsheetId: match && match.spreadsheetId ? match.spreadsheetId : SPREADSHEET_ID,
    sheetName: match ? match.sheetName : SHEET_NAME,
  };
}

// ─── 4. 시트 읽기와 쓰기 ────────────────────────────────────

/** [5] 선택한 문서를 열고 탭을 찾습니다. 탭이 없으면 만듭니다. */
function openSheet(target) {
  const book = SpreadsheetApp.openById(target.spreadsheetId);
  return book.getSheetByName(target.sheetName) || book.insertSheet(target.sheetName);
}

/** [6] 첫 행 제목을 확인합니다. 구버전 시트에는 마지막에 주거지역만 추가합니다. */
function prepareHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    return;
  }
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const oldHeadersMatch = current.slice(0, -1).join('|') === HEADERS.slice(0, -1).join('|');
  if (oldHeadersMatch && !current[HEADERS.length - 1]) {
    sheet.getRange(1, HEADERS.length).setValue(HEADERS[HEADERS.length - 1]).setFontWeight('bold');
  } else if (current.join('|') !== HEADERS.join('|')) {
    throw new Error('headers');
  }
}

/** [7] 선택한 시트의 B열에서 같은 요청번호를 찾아 중복 저장을 막습니다. */
function alreadySaved(sheet, requestId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  return Boolean(sheet.getRange(2, 2, lastRow - 1, 1)
    .createTextFinder(requestId)
    .matchEntireCell(true)
    .findNext());
}

/** [8] 열 순서에 맞춰 새 행 하나를 추가합니다. 전화번호 앞자리 0도 유지합니다. */
function writeSubmission(sheet, p) {
  const row = [
    Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
    p.request_id,
    p.page_id,
    p.name,
    p.phone,
    p.birth,
    p.age,
    p.gender,
    p.consult_time,
    p.age_group,
    Array.isArray(p.interest) ? p.interest.join(', ') : p.interest,
    p.message,
    '동의',
    p.utm_source,
    p.utm_campaign,
    p.region,
  ].map(safeCell);

  const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length);
  range.setNumberFormat('@'); // 모든 셀을 텍스트로 저장합니다.
  range.setValues([row]);
}

// ─── 5. 중복 처리, 값 보호, 응답 ────────────────────────────

/** [9] 중복 확인용 캐시를 엽니다. 사용할 수 없으면 시트 검색으로 처리합니다. */
function requestCache() {
  try {
    return CacheService.getScriptCache();
  } catch (_) {
    return null;
  }
}

/** [10] 같은 저장 위치에 이미 성공한 요청인지 빠르게 확인합니다. */
function cachedRequest(cache, key, targetKey) {
  try {
    return Boolean(cache && cache.get(key) === targetKey);
  } catch (_) {
    return false;
  }
}

/** [11] 성공한 요청번호와 저장 위치를 6시간 기억합니다. 고객 정보는 캐시하지 않습니다. */
function rememberRequest(cache, key, targetKey) {
  try {
    if (cache) cache.put(key, targetKey, 21600);
  } catch (_) {
    // 캐시 장애가 있어도 이미 저장된 신청은 성공입니다.
  }
}

/** [12] 입력값이 시트 수식으로 실행되지 않게 보호하고, 셀당 3,000자로 제한합니다. */
function safeCell(value) {
  const text = String(value == null ? '' : value).slice(0, 3000);
  return /^[=+\-@\t\r\n]/.test(text) ? "'" + text : text;
}

/** [13] YYYYMMDD 생년월일로 한국 날짜 기준 만 나이를 계산합니다. 잘못된 날짜는 null입니다. */
function serverAge(birth) {
  if (!/^\d{8}$/.test(birth)) return null;
  const y = Number(birth.slice(0, 4));
  const m = Number(birth.slice(4, 6));
  const d = Number(birth.slice(6, 8));
  const date = new Date(Date.UTC(y, m - 1, d));
  if (y < 1900 || date.getUTCFullYear() !== y ||
      date.getUTCMonth() + 1 !== m || date.getUTCDate() !== d) return null;

  const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd');
  const age = Number(today.slice(0, 4)) - y - (today.slice(4) < birth.slice(4) ? 1 : 0);
  return age < 0 ? null : age;
}

/** [14] 홈페이지가 확인할 성공 응답을 만듭니다. duplicate는 이미 저장된 요청입니다. */
function receipt(p, duplicate) {
  const result = { ok: true, request_id: p.request_id };
  if (duplicate) result.duplicate = true;
  return jsonResponse(result);
}

/** [15] 실패 원인을 사람이 이해할 수 있는 오류 메시지로 바꿉니다. */
function failureResponse(error) {
  const errors = {
    page_id: ['INVALID_PAGE_ID', '랜딩 번호가 올바르지 않습니다.'],
    request_id: ['INVALID_REQUEST_ID', '접수 요청번호가 올바르지 않습니다.'],
    name: ['INVALID_NAME', '이름을 확인해주세요.'],
    phone: ['INVALID_PHONE', '연락처를 확인해주세요.'],
    consent: ['CONSENT_REQUIRED', '개인정보 수집·이용에 동의해주세요.'],
    birth: ['INVALID_BIRTH', '생년월일을 확인해주세요.'],
    invalid: ['INVALID_INPUT', '입력 정보를 확인해주세요.'],
    routing: ['ROUTING_CONFIG', '저장 위치 설정을 확인해주세요.'],
    headers: ['SHEET_HEADERS', '접수 시트의 열 제목 설정을 확인해주세요.'],
  };
  const failure = errors[error.message] || ['STORAGE_FAILED', '시트 저장에 실패했습니다. 배포 권한과 시트 설정을 확인해주세요.'];
  return jsonResponse({ok: false, code: failure[0], error: failure[1]});
}

/** [16] 응답을 홈페이지가 읽을 수 있는 JSON 형식으로 보냅니다. */
function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
