// 하단 신청서와 푸터 사이에 표시하는 원본 필수 안내사항입니다.
export default function RequiredNotice() {
  return (
    <section className="ft-section" aria-labelledby="cancer-required-notice">
      <div className="content-wrap">
        <div className="container">
          <h6 id="cancer-required-notice">필수 안내사항</h6>
          <ul>
            <li>※ 보험계약자가 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</li>
            <li>① 질병이력, 연령증가 등으로 가입이 거절되거나 보험료가 인상될 수 있고,</li>
            <li>
              ② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수
              있습니다.
            </li>
            <li>※ 본 광고는 광고심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</li>
            <li>※ 한화피플라이프 보험대리점(등록번호 제2004018025호)</li>
            <li>※ 한화피플-준법-제2026-12-8147호(26.03.23~27.03.22)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
