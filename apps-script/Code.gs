// 이 파일 전체를 Apps Script의 Code.gs에 붙여넣고 새 버전으로 배포하세요.
const SPREADSHEET_ID = '1ME5SZBoiaKSQRlnuHxkO_7-4HtM_KqMf8HwnW5fvOdk';
const SHEET_NAME = '상담신청 테스트';
const HEADERS = ['접수시간', '요청번호', '랜딩번호', '이름', '연락처', '생년월일', '나이', '성별', '상담시간', '연령대', '관심상품', '문의내용', '동의여부', '유입소스', '유입캠페인'];

function doGet() {
  return jsonResponse({ok: true, service: 'landing-consultation', version: 1});
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 20000) throw new Error('invalid');
    const p = JSON.parse(e.postData.contents);
    if (!['aa0001', 'aa0002'].includes(p.page_id)) throw new Error('invalid');
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(p.request_id || '')) throw new Error('invalid');
    if (!/^[가-힣a-zA-Z]{2,40}$/.test(p.name || '')) throw new Error('invalid');
    const phone = String(p.phone || '').replace(/[^0-9]/g, '');
    if (!/^(?:02\d{7,8}|0(?:31|32|33|41|42|43|44|51|52|53|54|55|61|62|63|64)\d{7,8}|01[016789]\d{8}|070\d{8}|050[2-8]\d{7})$/.test(phone)) throw new Error('invalid');
    if (!['on', true, 'true'].includes(p.agree) || p.website_alt) throw new Error('invalid');
    const birth = String(p.birth || '');
    const age = birth ? serverAge(birth) : '';
    if (birth && age === null) throw new Error('invalid');
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const book = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    if (sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0].join('|') !== HEADERS.join('|')) throw new Error('headers');
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).createTextFinder(p.request_id).matchEntireCell(true).findNext()) {
      return jsonResponse({ok: true, request_id: p.request_id, duplicate: true});
    }
    const row = [Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'), p.request_id, p.page_id, p.name, phone, birth, age, p.gender, p.consult_time, p.age_group, Array.isArray(p.interest) ? p.interest.join(', ') : p.interest, p.message, '동의', p.utm_source, p.utm_campaign].map(safeCell);
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length);
    range.setNumberFormat('@');
    range.setValues([row]);
    SpreadsheetApp.flush();
    return jsonResponse({ok: true, request_id: p.request_id});
  } catch (error) {
    return jsonResponse({ok: false, error: error.message === 'invalid' ? '입력 정보를 확인해주세요.' : '시트 저장에 실패했습니다. 배포 권한과 시트 설정을 확인해주세요.'});
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function safeCell(value) {
  const text = String(value == null ? '' : value).slice(0, 3000);
  return /^[=+\-@\t\r\n]/.test(text) ? "'" + text : text;
}

function serverAge(birth) {
  if (!/^\d{8}$/.test(birth)) return null;
  const y = Number(birth.slice(0, 4)), m = Number(birth.slice(4, 6)), d = Number(birth.slice(6, 8));
  const date = new Date(Date.UTC(y, m - 1, d));
  if (y < 1900 || date.getUTCFullYear() !== y || date.getUTCMonth() + 1 !== m || date.getUTCDate() !== d) return null;
  const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd');
  const age = Number(today.slice(0, 4)) - y - (today.slice(4) < birth.slice(4) ? 1 : 0);
  return age < 0 ? null : age;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
