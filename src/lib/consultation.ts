export function digitsOnly(value: string, limit: number) {
  return value.replace(/[^0-9]/g, '').slice(0, limit);
}
export function formatPhone(value: string) {
  const digits = digitsOnly(value, 11);
  return [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7, 11)].filter(Boolean).join('-');
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
    page_id: 'cancer-01', utm_source: new URLSearchParams(location.search).get('utm_source') || '',
    utm_campaign: new URLSearchParams(location.search).get('utm_campaign') || ''};
}
