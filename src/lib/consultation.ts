export function digitsOnly(value: string, limit: number) {
  return value.replace(/[^0-9]/g, '').slice(0, limit);
}
export function formatPhone(value: string) {
  const digits = digitsOnly(value, 11);
  const prefixLength = digits.startsWith('02') ? 2 : 3;
  const middleLength = /^(01|070|050)/.test(digits) || digits.length > prefixLength + 7 ? 4 : 3;
  return [digits.slice(0, prefixLength), digits.slice(prefixLength, prefixLength + middleLength), digits.slice(prefixLength + middleLength)].filter(Boolean).join('-');
}
export function validPhone(value: string) {
  return /^(?:02\d{7,8}|0(?:31|32|33|41|42|43|44|51|52|53|54|55|61|62|63|64)\d{7,8}|01[016789]\d{8}|070\d{8}|050[2-8]\d{7})$/.test(digitsOnly(value, 11));
}
export function cleanName(value: string) {
  return value.replace(/[^가-힣a-zA-Z]/g, '').slice(0, 40);
}
export function validName(value: string) {
  return /^[가-힣a-zA-Z]{2,40}$/.test(value) && !/(씨발|시발|씨팔|시팔|씹|병신|개새끼|새끼|좆|지랄|fuck|shit|bitch)/i.test(value);
}
export const SUBMISSION_SESSION_KEY = 'consult-submission-limit';
export type SubmissionLimit = {attempts: number[]; blockedUntil: number};
export function readSubmissionLimit(): SubmissionLimit {
  try {
    const value = JSON.parse(sessionStorage.getItem(SUBMISSION_SESSION_KEY) || '{}');
    return {attempts: Array.isArray(value.attempts) ? value.attempts.filter((v: unknown) => typeof v === 'number' && Number.isFinite(v)) : [], blockedUntil: Number(value.blockedUntil) || 0};
  } catch { return {attempts: [], blockedUntil: 0}; }
}
export function registerSubmission(state: SubmissionLimit, now = Date.now()): SubmissionLimit {
  if (state.blockedUntil > now) return state;
  const attempts = [...state.attempts.filter(t => t > now - 60_000), now];
  return attempts.length >= 5 ? {attempts: [], blockedUntil: now + 30_000} : {attempts, blockedUntil: 0};
}
export function koreaToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(now);
  const part = (type: string) => Number(parts.find(p => p.type === type)!.value);
  return {year: part('year'), month: part('month'), day: part('day')};
}
export function normalizeBirth(value: string, now = new Date()) {
  const digits = digitsOnly(value, 8);
  if (digits.length !== 6) return digits;
  const century = Number(digits.slice(0, 2)) <= koreaToday(now).year % 100 ? '20' : '19';
  return century + digits;
}
export function calculateAge(birth: string, now = new Date()): number | null {
  if (!/^\d{8}$/.test(birth)) return null;
  const year = Number(birth.slice(0, 4)), month = Number(birth.slice(4, 6)), day = Number(birth.slice(6, 8));
  const date = new Date(Date.UTC(year, month - 1, day));
  if (year < 1900 || date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
  const today = koreaToday(now);
  const age = today.year - year - (today.month < month || (today.month === month && today.day < day) ? 1 : 0);
  return age >= 0 ? age : null;
}
// The future central DB receiver should accept this payload and recompute age server-side.
export function buildConsultationPayload(form: HTMLFormElement, now = new Date()) {
  const data = new FormData(form);
  const birth = normalizeBirth(String(data.get('birth') || ''), now);
  return {...Object.fromEntries(data), phone: digitsOnly(String(data.get('phone') || ''), 11), birth,
    age: birth ? calculateAge(birth, now) : null, interest: data.getAll('interest'),
    page_id: form.dataset.pageId || 'aa0001', utm_source: new URLSearchParams(location.search).get('utm_source') || '',
    utm_campaign: new URLSearchParams(location.search).get('utm_campaign') || ''};
}
