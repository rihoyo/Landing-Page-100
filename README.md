# Landing-Page-100

예시 디자인을 재현한 정적 React 랜딩페이지입니다. 관리자 화면과 로컬 DB는 없습니다.
상담 신청서는 공통 검증·요청 제한·중복 접수 방지 로직을 거쳐 기존 Google Apps Script 수신 API로 전송합니다.

## 실행

```bash
npm ci
npm run dev
```

## 정적 배포

```bash
npm run build
```

생성된 `dist/`를 정적 호스팅 서비스에 배포합니다.

페이지 구성: `src/pages/home/components/`
업체 정보: `src/components/feature/SiteFooter.tsx`
신청서: `src/pages/home/components/ConsultSection.tsx`

## 디자인별 주소

- `/aa0001/`: 기존 오렌지 디자인
- `/aa0002/`: 블루 색상과 새 히어로·신청서 스타일
- `/aa0003/`: 청록색 건강보험 디자인
- `/`: 기존 디자인 별칭

GitHub Pages용 실제 HTML 경로는 빌드 시 생성됩니다. 모든 페이지는 하나의 공통 신청 훅·전송 모듈·수신 API를 사용하며 `page_id`로 랜딩을 구분합니다 (`aa0001`, `aa0002`, `aa0003`).

## 랜딩 확장 및 성능

경로와 정적 HTML 생성은 `src/pages/registry.ts` 목록을 함께 사용합니다. 새 랜딩을 추가할 때 목록과 `src/App.tsx`의 지연 로딩 연결을 추가합니다. 랜딩별 JS/CSS는 선택한 페이지에 필요한 청크만 로드하며, 신청 로직은 `src/hooks/useConsultationForm.ts`에 공유합니다. 대기 타이머는 요청 제한이 활성화된 동안만 실행합니다. 세 번째 랜딩은 건강보험·상담사·엄마와 아이·가족과 병원·보험료 절약의 5종 일러스트를 `public/assets/health/`의 WebP 이미지 URL로 사용합니다. 모든 파일은 100KB 미만이며 고해상도 원본 PNG는 저장소에 포함하지 않습니다. `srcSet`으로 화면에 맞는 크기를 선택하고, 첫 화면 이미지는 우선 로딩하며 아래 이미지는 지연 로딩합니다. 새 랜딩에서도 같은 자산 URL을 재사용할 수 있습니다.

Node.js 24를 사용합니다. GitHub Pages 경로 검증은 `VITE_BASE_PATH=/Landing-Page-100/ npm run build`로 실행할 수 있습니다. 해당 빌드를 미리 볼 때도 `VITE_BASE_PATH=/Landing-Page-100/ npm start`로 같은 기본 경로를 적용합니다. 외부 신청 API의 실제 데이터 저장 검증은 운영 데이터를 생성하므로 일반 화면 테스트에서는 요청을 모킹합니다.

## 공통 수신 서버 업데이트

현재 공개 수신 API는 동일한 입력의 `aa0001` 요청은 승인하고 `aa0003` 요청은 거부합니다. 사용자가 공유한 코드에는 `aa0003`이 허용되어 있으므로 기존 웹 앱 배포에 최신 코드가 반영되었는지 확인해야 합니다. `version` 값만으로 허용 목록을 판단할 수 없습니다. `aa0003` 접수를 받으려면 [수신 서버 업데이트 안내](apps-script/README.md)에 따라 `apps-script/Code.gs` v2를 기존 배포에 한 번 반영해야 합니다. GitHub Pages 배포는 Google Apps Script를 자동으로 업데이트하지 않습니다. v2는 정상적인 `aaNNNN` 번호를 공통으로 처리하므로 새 랜딩마다 수신 코드를 복사하거나 허용 목록을 변경할 필요가 없습니다.

`npm test`는 기존 랜딩과 새 랜딩 수신, 시트 헤더 마이그레이션, 중복 요청, 전송 오류와 이미지 용량 제한을 검증합니다. 시트 저장의 실제 운영 검증은 Apps Script v2 배포 후 별도로 해야 합니다.
