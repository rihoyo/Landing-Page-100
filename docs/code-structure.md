# 코드 위치와 담당 기능

| 기능 | 위치 | 수정할 내용 |
| --- | --- | --- |
| 첫 화면 연결 | `src/main.tsx`, `src/App.tsx` | 현재 랜딩 코드 연결, React 이벤트 연결 |
| 정적 첫 화면 | `src/prerender.tsx`, `scripts/create-routes.mjs` | JS 실행 전 표시할 HTML, 페이지별 스타일·코드 힌트 |
| 랜딩 번호 | `src/pages/registry.ts` | URL과 랜딩 번호 등록 |
| 건강보험 화면 순서 | `src/pages/health/page.tsx` | 영역 배치 순서 |
| 건강보험 각 영역 | `src/pages/health/sections/` | 대표 화면·통계·보장·전문가·보험료 안내 |
| 건강보험 입력 화면 | `src/pages/health/CompactForm.tsx` | 입력칸과 안내 문구 |
| 기존 랜딩 영역 | `src/pages/home/components/` | 암보험 페이지 각 영역 |
| 공통 신청 진행 | `src/hooks/useConsultationForm.ts` | 입력 상태·검사·전송·결과 표시 |
| 이름·전화번호 검사 | `src/lib/consultation/validation.ts` | 이름 검사, 번호 정리와 표시 형식 |
| 생년월일·나이 | `src/lib/consultation/birth.ts` | 한국 날짜, 생년월일 보완, 만 나이 |
| 반복 접수 제한 | `src/lib/consultation/rateLimit.ts` | 단시간 반복 접수 제한. 개인정보를 세션에 저장하지 않음 |
| 서버 전송 데이터 | `src/lib/consultation/payload.ts` | 랜딩 번호·입력값·유입 경로 조합 |
| HTTP 전송 | `src/lib/sheets.ts` | 공통 URL, 단일 POST, 최대 대기 한도, 저장 응답 검사 |
| 시트 저장 서버 | `apps-script/Code.gs` | 입력 검사, 범위별 저장 위치, 중복 방지, 행 저장 |

`src/lib/consultation.ts`는 공통 기능을 다시 내보내는 진입점입니다. 화면은 이 파일을 가져오므로 내부 파일을 정리해도 랜딩마다 수정할 필요가 없습니다.

## 신청 순서와 속도

1. 브라우저에서 입력을 검사합니다.
2. 한 번의 POST로 Apps Script에 전달합니다. text/plain 요청으로 추가 OPTIONS 요청을 피합니다.
3. 서버가 중복 확인 후 행을 저장합니다.
4. 성공 응답과 요청번호를 확인한 뒤 완료를 표시합니다.

HTML의 preconnect는 Google 서버 연결만 미리 준비합니다. 신청 전 상태 조회·예열 요청·개인정보 전송은 추가하지 않습니다. keepalive는 작은 전송이 페이지 이동 때문에 바로 취소되는 것을 줄이지만, 전송 완료를 보장하지는 않습니다.

저장 서버에서는 마지막 행을 요청당 한 번만 읽어 제목 검사·중복 확인·행 쓰기에 공유합니다. 기존에는 정상 접수 시 마지막 행을 세 번 읽었습니다. 성공한 재전송은 캐시로 확인하고, 캐시가 없으면 시트에서 확인합니다.

25초 설정은 인위적인 대기가 아니라 응답을 기다리는 최대 시간입니다. 이를 줄인다고 Google 저장 자체가 빨라지지는 않습니다. Apps Script의 실행 준비·시트 API 처리·응답 리다이렉트는 사이트 코드만으로 제거할 수 없습니다.

2026-10-10 클라우드 환경에서 상태 조회 GET 1회를 측정했을 때 총 1.26초, 리다이렉트 1회였습니다. 이후 가상 데이터 한 건의 실제 POST는 저장 성공 응답까지 3.18초, 동일 요청번호 재전송은 중복 성공 응답까지 1.40초가 걸렸습니다. 실제 고객 데이터는 사용하지 않았으며 테스트 행 한 건이 접수되었습니다. 단일 측정이며 고객 환경의 보장된 응답 시간이나 변경 후 성능 비교 결과는 아닙니다. Apps Script 변경은 기존 웹 앱 배포를 새 버전으로 업데이트해야 적용됩니다.

더 짧고 일정한 접수 응답이 필요하면 별도 API에서 영속 DB에 먼저 저장하고, 시트 반영은 백그라운드로 처리하는 구조가 다음 단계입니다. 예: Cloudflare Worker + D1 + Queue → Sheets. 이때 완료 표시는 DB 저장 확인 후에만 가능하며 시트 반영 실패 재시도·중복 방지가 필요합니다. 현재는 이 인프라를 생성하거나 저장 위치를 변경하지 않았습니다.

## 코드 정리 명령

- `npm run format`: 역할별 소스와 주석을 동일한 형식으로 정리
- `npm run format:check`: 코드 형식 검사
- `npm test`: 저장·전송·중복 처리 검증
- `VITE_BASE_PATH=/Landing-Page-100/ npm run build`: 공개 사이트용 빌드
