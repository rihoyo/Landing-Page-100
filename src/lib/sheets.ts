// One transport and one receiver for every landing. Never substitute another page_id.
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSrv2QHh4t354p704j8bENmZfngHq2dcWFvmBV29DOg9D_fYlsS7mWf44Ph6o9-91f/exec';

export class ConsultationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'ConsultationError';
  }
}

export async function submitConsultation(payload: Record<string, unknown>, requestId: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);
  try {
    // text/plain is a CORS simple request. A no-cors/opaque response cannot confirm storage.
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify({...payload, request_id: requestId}),
      redirect: 'follow', signal: controller.signal, credentials: 'omit',
    });
    if (!response.ok) throw new ConsultationError('저장 서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.', 'HTTP_ERROR');
    const result = await response.json();
    if (result.ok !== true) {
      // Diagnose the old two-page receiver only after a rejection, without extra
      // network requests on successful submissions or changing the payload.
      if (!result.code && /^aa\d{4}$/.test(String(payload.page_id)) && !['aa0001', 'aa0002'].includes(String(payload.page_id))) {
        let service;
        try {
          const status = await fetch(ENDPOINT, {signal: controller.signal, credentials: 'omit'});
          if (status.ok) service = await status.json();
        } catch { /* Preserve the receiver's original failure. */ }
        if (service?.service === 'landing-consultation' && service.version === 1) {
          throw new ConsultationError('현재 이 페이지의 상담 접수를 처리할 수 없습니다. 관리자에게 문의해주세요.', 'RECEIVER_UPDATE_REQUIRED');
        }
      }
      throw new ConsultationError(result.error || '저장 결과를 확인하지 못했습니다. 잠시 후 다시 시도해주세요.', result.code || 'RECEIVER_REJECTED');
    }
    if (result.request_id !== requestId) throw new ConsultationError('저장 확인 번호가 일치하지 않습니다. 같은 내용으로 다시 시도해주세요.', 'REQUEST_ID_MISMATCH');
  } finally {
    window.clearTimeout(timeout);
  }
}
