const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSrv2QHh4t354p704j8bENmZfngHq2dcWFvmBV29DOg9D_fYlsS7mWf44Ph6o9-91f/exec';

export async function submitConsultation(payload: Record<string, unknown>, requestId: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);
  try {
    // A plain-text POST avoids a cross-origin preflight. Never use no-cors:
    // an opaque response cannot confirm that the sheet actually saved the row.
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify({...payload, request_id: requestId}),
      redirect: 'follow',
      signal: controller.signal,
      credentials: 'omit',
    });
    if (!response.ok) throw new Error('저장 서버에 연결하지 못했습니다.');
    const result = await response.json();
    if (result.ok !== true || result.request_id !== requestId) throw new Error(result.error || '저장 결과를 확인하지 못했습니다.');
  } finally {
    window.clearTimeout(timeout);
  }
}
