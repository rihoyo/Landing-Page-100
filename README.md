# Landing-Page-100

예시 디자인을 재현한 정적 React 랜딩페이지입니다. 관리자 화면, DB, 접수 API는 없습니다.
상담 신청서는 화면만 구현되어 있으며 제출 시 미연결 안내를 표시합니다. 개인정보는 전송하거나 저장하지 않습니다.
향후 별도 메인 DB의 수신 API를 신청서에 연결할 수 있습니다.

## 실행

```bash
npm install
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
- `/`: 기존 디자인 별칭

GitHub Pages용 실제 HTML 경로는 빌드 시 생성됩니다. 두 페이지는 같은 신청 검증과 탭별 요청 제한을 공유합니다. 향후 전송 데이터의 `page_id`는 각각 `aa0001`, `aa0002`입니다. 현재 개인정보 전송 및 저장은 없습니다.
