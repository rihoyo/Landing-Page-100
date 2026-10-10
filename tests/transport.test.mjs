import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/lib/sheets.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}}).outputText;
const {submitConsultation, ConsultationError} = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
globalThis.window = {setTimeout, clearTimeout};
const response = data => ({ok: true, json: async () => data});

test('every landing uses the same transport and preserves page_id and region', async () => {
  for (const id of ['aa0001', 'aa0002', 'aa0003', 'aa0004']) {
    globalThis.fetch = async (_, options) => {
      const body = JSON.parse(options.body);
      assert.equal(body.page_id, id);
      assert.equal(body.region, '서울');
      assert.equal(options.headers['Content-Type'], 'text/plain;charset=utf-8');
      assert.notEqual(options.mode, 'no-cors');
      return response({ok: true, request_id: body.request_id});
    };
    await submitConsultation({page_id: id, region: '서울'}, `request-${id}`);
  }
});
test('old receiver rejection is diagnosed, never reported as a successful save', async () => {
  globalThis.fetch = async (_, options) => options.body ? response({ok: false, error: '입력 정보를 확인해주세요.'}) : response({service: 'landing-consultation', version: 1});
  await assert.rejects(submitConsultation({page_id: 'aa0003'}, 'request-0003'), error => error instanceof ConsultationError && error.code === 'RECEIVER_UPDATE_REQUIRED');
});
test('receiver failure and mismatched receipt never produce success', async () => {
  globalThis.fetch = async () => response({ok: false, code: 'STORAGE_FAILED', error: '시트 저장 실패'});
  await assert.rejects(submitConsultation({page_id: 'aa0003'}, 'request-0003'), {code: 'STORAGE_FAILED'});
  globalThis.fetch = async () => response({ok: true, request_id: 'different-request'});
  await assert.rejects(submitConsultation({page_id: 'aa0003'}, 'request-0003'), {code: 'REQUEST_ID_MISMATCH'});
});
