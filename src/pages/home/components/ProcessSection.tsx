import { processSteps } from "@/mocks/processSteps";

export default function ProcessSection() {
  return (
    <section id="process" className="w-full bg-secondary-950 py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-800 text-primary-300 text-xs font-semibold">
              <i className="ri-route-line"></i> 상담 진행 절차
            </span>
            <h2 className="mt-5 font-heading text-2xl md:text-4xl font-bold text-background-50 leading-snug">
              신청부터 가입까지,
              <br className="hidden sm:block" /> 딱 4단계면 충분합니다
            </h2>
            <p className="mt-5 text-sm md:text-base text-secondary-300 leading-relaxed">
              복잡한 보험 비교는 저희가 도와드립니다.
              <br className="hidden sm:block" />
              상담사가 첫 연락부터 가입 이후 관리까지 함께합니다.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="relative bg-secondary-900 rounded-lg border border-secondary-800 p-5 md:p-6"
              >
                <span className="font-heading text-3xl font-bold text-secondary-700">{step.step}</span>
                <span className="mt-4 w-12 h-12 rounded-lg bg-primary-500/15 text-primary-400 flex items-center justify-center">
                  <i className={`${step.icon} text-2xl`}></i>
                </span>
                <h3 className="mt-5 font-heading text-base md:text-lg font-bold text-background-50">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs md:text-sm text-secondary-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#consult"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-primary-500 text-background-50 text-base font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-circle-line"></i> 1단계 상담 신청 바로 하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}