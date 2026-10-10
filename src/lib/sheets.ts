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
      // Preserve the actual rejection. A manually edited version number does
      // not prove which landing IDs the receiver accepts.
      throw new ConsultationError(result.error || '저장 결과를 확인하지 못했습니다. 잠시 후 다시 시도해주세요.', result.code || 'RECEIVER_REJECTED');
    }
    if (result.request_id !== requestId) throw new ConsultationError('저장 확인 번호가 일치하지 않습니다. 같은 내용으로 다시 시도해주세요.', 'REQUEST_ID_MISMATCH');
  } finally {
    window.clearTimeout(timeout);
  }
}
