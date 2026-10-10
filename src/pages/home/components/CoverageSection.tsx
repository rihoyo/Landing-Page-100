import { coverageItems } from '@/mocks/coverageItems';

export default function CoverageSection() {
  return (
    <section id="coverage" className="w-full bg-background-50 py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100 text-accent-800 text-xs font-semibold">
              <i className="ri-sparkling-2-line"></i> 암보험 보장 항목
            </span>
            <h2 className="mt-5 font-heading text-2xl md:text-4xl font-bold text-foreground-950 leading-snug">
              암보험은 어떤 보장을
              <br className="hidden sm:block" /> 챙겨야 할까요?
            </h2>
            <p className="mt-5 text-sm md:text-base text-foreground-600 leading-relaxed">
              암 진단 이후에는 진단비뿐 아니라 치료비·수술비·간병비까지 오랜 기간 부담이 이어집니다.
              <br className="hidden sm:block" />
              아래 보장 항목을 기준으로 상품을 비교하면 나에게 꼭 필요한 보장을 놓치지 않을 수
              있습니다.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {coverageItems.map((item) => (
              <article
                key={item.id}
                className="group bg-background-50 rounded-lg border border-background-200 p-5 md:p-6 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <i className={`${item.icon} text-2xl`}></i>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary-100 text-secondary-900 text-[11px] font-semibold">
                    {item.amount}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base md:text-lg font-bold text-foreground-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs md:text-sm text-foreground-600 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-accent-50 border border-accent-200 rounded-lg px-6 py-6">
            <p className="text-sm md:text-[15px] text-accent-900 leading-relaxed text-center sm:text-left">
              <strong className="font-semibold">
                내 보험에 필요한 보장이 무엇인지 헷갈린다면?
              </strong>
              <br className="hidden sm:block" /> 상담 한 번으로 부족한 보장과 불필요한 중복을 함께
              점검해 드립니다.
            </p>
            <a
              href="#consult"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-check-double-line"></i> 보장 점검 받기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
