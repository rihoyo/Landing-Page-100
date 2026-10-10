export default function SiteFooter() {
  return (
    <footer className="bg-secondary-950 text-secondary-200">
      <div className="w-full px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="lg:max-w-md">
              <p className="font-heading text-xl font-bold text-background-50">
                메가(주) <span className="text-primary-400">암보험</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-secondary-300">
                대한민국 암보험을 무료로 비교하고 상담받는 온라인 보험 비교 서비스입니다.
                <br className="hidden sm:block" />
                나에게 맞는 보장과 합리적인 보험료를 함께 찾아드립니다.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
              <div>
                <p className="text-sm font-semibold text-background-50 mb-4">보험 안내</p>
                <ul className="space-y-2.5 text-sm text-secondary-300">
                  <li>
                    <a
                      href="#coverage"
                      className="hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      보장 항목
                    </a>
                  </li>
                  <li>
                    <a
                      href="#products"
                      className="hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      추천 상품
                    </a>
                  </li>
                  <li>
                    <a
                      href="#premium"
                      className="hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      연령대별 보험료
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-background-50 mb-4">상담</p>
                <ul className="space-y-2.5 text-sm text-secondary-300">
                  <li>
                    <a
                      href="#process"
                      className="hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      상담 절차
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      자주 묻는 질문
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-background-50 mb-4">고객 지원</p>
                <ul className="space-y-2.5 text-sm text-secondary-300">
                  <li>
                    <a
                      href="#consult"
                      className="hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      상담 신청
                    </a>
                  </li>
                  <li>
                    <span className="text-secondary-400">평일 09:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-secondary-800 text-xs text-secondary-400 leading-relaxed space-y-2">
            <p>
              <strong className="text-secondary-300">[ 필수안내사항 ]</strong>
              <br />
              ※ 보험대리점 : 메가(주) (GoodRich Co., Ltd.) (등록번호 : 제2005108004호)
              <br />
              ※ 본 광고는 광고심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.
              <br />※ 광고심의필 제 00000호 (2026.00.00~2027.00.00)
            </p>
            <p>
              ※ 보험계약자가 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서 질병이력,
              연령증가 등으로 가입이 거절되거나 보험료가 인상될 수 있습니다. 가입 상품에 따라 새로운
              면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.
            </p>
            <p>
              ※ 광고대행사: (주)클릭제트는 홈페이지 제작 및 광고 대행만을 진행하며, 보험 상품 설계
              및 판매에 직접적인 관여를 하지 않습니다.
            </p>
            <p className="pt-2 text-secondary-500">
              Copyright ⓒ GoodRich Co., Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
