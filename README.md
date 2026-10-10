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
- `/aa0003/`, `/aa/0003/`: 청록색 건강보험 디자인
- `/`: 기존 디자인 별칭

GitHub Pages용 실제 HTML 경로는 빌드 시 생성됩니다. 모든 페이지는 공통 신청 훅과 수신 API를 사용하며 `page_id`로 랜딩을 구분합니다 (`aa0001`, `aa0002`, `aa0003`).

## 랜딩 확장 및 성능

경로와 정적 HTML 생성은 `src/pages/registry.ts` 목록을 함께 사용합니다. 새 랜딩을 추가할 때 목록과 `src/App.tsx`의 지연 로딩 연결을 추가합니다. 랜딩별 JS/CSS는 선택한 페이지에 필요한 청크만 로드하며, 신청 로직은 `src/hooks/useConsultationForm.ts`에 공유합니다. 대기 타이머는 요청 제한이 활성화된 동안만 실행합니다. 세 번째 랜딩의 일러스트는 해상도에 독립적인 SVG이며 별도 이미지 요청이 없습니다.

Node.js 24를 사용합니다. GitHub Pages 경로 검증은 `VITE_BASE_PATH=/Landing-Page-100/ npm run build`로 실행할 수 있습니다. 해당 빌드를 미리 볼 때도 `VITE_BASE_PATH=/Landing-Page-100/ npm start`로 같은 기본 경로를 적용합니다. 외부 신청 API의 실제 데이터 저장 검증은 운영 데이터를 생성하므로 일반 화면 테스트에서는 요청을 모킹합니다.
