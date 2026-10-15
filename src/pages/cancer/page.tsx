import { useEffect, useRef } from 'react';
import Content from './Content';
import RequiredNotice from './RequiredNotice';
import './cancer.css';

// 상담 버튼은 가까운 신청서로 이동하고 신청자·보험사 슬라이드를 순환합니다.
export default function Cancer() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = window.setInterval(() => {
      root.current?.querySelectorAll('.swiper-wrapper').forEach((track) => {
        if (track.firstElementChild) track.appendChild(track.firstElementChild);
      });
    }, 3000);
    document.title = '암보험 비교사이트';
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div
      className="cancer-page"
      ref={root}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.check_btn, .message, .benner')) {
          const form = root.current?.querySelector<HTMLFormElement>('form');
          form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          form
            ?.querySelector<HTMLInputElement>('input[name="name"]')
            ?.focus({ preventScroll: true });
        }
      }}
    >
      <Content />
      <RequiredNotice />
      <div className="cancer-footer">
        <div>
          <p>보험대리점 : 메가(주) (등록번호 : 제2005108004호)</p>
          <p>
            ※ 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 경우, 질병이력·연령증가 등으로
            가입이 거절되거나 보험료가 인상될 수 있습니다.
          </p>
          <p>※ 가입 상품에 따라 새로운 면책기간 및 보장 제한 등 불이익이 발생할 수 있습니다.</p>
          <p>광고대행사 : (주)클릭제트 | 홈페이지 제작 및 광고 대행</p>
          <p>Copyright ⓒ GoodRich Co., Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
