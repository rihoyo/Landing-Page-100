// 반복 접수 제한: 브라우저 세션에 접수 횟수만 보관합니다. 개인정보는 보관하지 않습니다.
export const SUBMISSION_SESSION_KEY = 'consult-submission-limit';
export type SubmissionLimit = { attempts: number[]; blockedUntil: number };
export function readSubmissionLimit(): SubmissionLimit {
  try {
    const value = JSON.parse(sessionStorage.getItem(SUBMISSION_SESSION_KEY) || '{}');
    return {
      attempts: Array.isArray(value.attempts)
        ? value.attempts.filter((v: unknown) => typeof v === 'number' && Number.isFinite(v))
        : [],
      blockedUntil: Number(value.blockedUntil) || 0,
    };
  } catch {
    return { attempts: [], blockedUntil: 0 };
  }
}
export function registerSubmission(state: SubmissionLimit, now = Date.now()): SubmissionLimit {
  if (state.blockedUntil > now) return state;
  const attempts = [...state.attempts.filter((t) => t > now - 60_000), now];
  return attempts.length >= 5
    ? { attempts: [], blockedUntil: now + 30_000 }
    : { attempts, blockedUntil: 0 };
}
