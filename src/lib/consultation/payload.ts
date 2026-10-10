// 전송 데이터: 모든 랜딩의 입력을 같은 서버 계약으로 변환합니다.
import { digitsOnly } from './validation';
import { normalizeBirth, calculateAge } from './birth';

// 서버에서도 생년월일을 검사하고 나이를 다시 계산합니다.
export function buildConsultationPayload(form: HTMLFormElement, now = new Date()) {
  const data = new FormData(form);
  const birth = normalizeBirth(String(data.get('birth') || ''), now);
  return {
    ...Object.fromEntries(data),
    phone: digitsOnly(String(data.get('phone') || ''), 11),
    birth,
    age: birth ? calculateAge(birth, now) : null,
    interest: data.getAll('interest'),
    page_id: form.dataset.pageId || 'aa0001',
    utm_source: new URLSearchParams(location.search).get('utm_source') || '',
    utm_campaign: new URLSearchParams(location.search).get('utm_campaign') || '',
  };
}
