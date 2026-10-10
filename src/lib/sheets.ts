// 모든 랜딩이 사용하는 전송 모듈. 랜딩 번호를 변경하거나 저장 전에 성공 처리하지 않습니다.
// 1. 서버 주소와 응답 대기 한도
const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxSrv2QHh4t354p704j8bENmZfngHq2dcWFvmBV29DOg9D_fYlsS7mWf44Ph6o9-91f/exec';

const REQUEST_TIMEOUT_MS = 25_000; // 강제로 기다리는 시간이 아니라 최대 응답 대기 시간입니다.

// 2. 화면에 전달할 오류: 서버의 오류 코드와 메시지를 유지합니다.
export class ConsultationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'ConsultationError';
  }
}

// 3. 단일 POST 요청 → 저장 성공 여부 및 요청번호 확인
export async function submitConsultation(payload: Record<string, unknown>, requestId: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    // text/plain으로 사전 OPTIONS 요청을 피합니다. 응답을 읽어 실제 저장을 확인합니다.
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, request_id: requestId }),
      redirect: 'follow',
      signal: controller.signal,
      credentials: 'omit',
      keepalive: true, // 이동 직전 시작된 작은 전송이 브라우저에서 바로 취소되지 않게 합니다.
    });
    if (!response.ok)
      throw new ConsultationError(
        '저장 서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.',
        'HTTP_ERROR',
      );
    const result = await response.json();
    if (result.ok !== true) {
      // 버전 숫자로 원인을 추측하지 않고 서버의 실제 오류를 전달합니다.
      throw new ConsultationError(
        result.error || '저장 결과를 확인하지 못했습니다. 잠시 후 다시 시도해주세요.',
        result.code || 'RECEIVER_REJECTED',
      );
    }
    if (result.request_id !== requestId)
      throw new ConsultationError(
        '저장 확인 번호가 일치하지 않습니다. 같은 내용으로 다시 시도해주세요.',
        'REQUEST_ID_MISMATCH',
      );
  } finally {
    window.clearTimeout(timeout);
  }
}
