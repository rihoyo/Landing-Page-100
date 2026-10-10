// 이름·연락처: 입력 정리, 표시 형식, 유효성 검사
export function digitsOnly(value: string, limit: number) {
  return value.replace(/[^0-9]/g, '').slice(0, limit);
}
export function formatPhone(value: string) {
  const digits = digitsOnly(value, 11);
  const prefixLength = digits.startsWith('02') ? 2 : 3;
  const middleLength = /^(01|070|050)/.test(digits) || digits.length > prefixLength + 7 ? 4 : 3;
  return [
    digits.slice(0, prefixLength),
    digits.slice(prefixLength, prefixLength + middleLength),
    digits.slice(prefixLength + middleLength),
  ]
    .filter(Boolean)
    .join('-');
}
export function validPhone(value: string) {
  return /^(?:02\d{7,8}|0(?:31|32|33|41|42|43|44|51|52|53|54|55|61|62|63|64)\d{7,8}|01[016789]\d{8}|070\d{8}|050[2-8]\d{7})$/.test(
    digitsOnly(value, 11),
  );
}
export function cleanName(value: string) {
  return value.replace(/[^가-힣a-zA-Z]/g, '').slice(0, 40);
}
export function validName(value: string) {
  return (
    /^[가-힣a-zA-Z]{2,40}$/.test(value) &&
    !/(씨발|시발|씨팔|시팔|씹|병신|개새끼|새끼|좆|지랄|fuck|shit|bitch)/i.test(value)
  );
}
