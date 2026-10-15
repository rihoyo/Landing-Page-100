// 하위 경로에 배포해도 같은 로컬 이미지 URL을 사용합니다.
export const asset = (path: string) => `${import.meta.env.BASE_URL}assets/cancer/${path}`;
