import { useState } from 'react';
import { agePlans } from '@/mocks/coverageItems';

const formatWon = (value: number) => value.toLocaleString('ko-KR');

export default function PremiumSection() {
  const [activeId, setActiveId] = useState(agePlans[2].id);
  const active = agePlans.find((p) => p.id === activeId) ?? agePlans[0];

  return (
    <section id="premium" className="w-full bg-background-50 py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
              <i className="ri-calendar-check-line"></i> 연령대별 예상 보험료
            </span>
            <h2 className="mt-5 font-heading text-2xl md:text-4xl font-bold text-foreground-950 leading-snug">
              나이대별로 암보험료가
              <br className="hidden sm:block" /> 얼마나 다를까요?
            </h2>
            <p className="mt-5 text-sm md:text-base text-foreground-600 leading-relaxed">
              같은 보장이라도 나이에 따라 보험료 차이가 큽니다.
              <br className="hidden sm:block" />
              연령대를 선택해 예상 보험료를 확인해 보세요.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {agePlans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setActiveId(plan.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                  active.id === plan.id
                    ? 'bg-primary-500 text-background-50 border-primary-500'
                    : 'bg-background-50 text-foreground-600 border-background-300 hover:border-primary-300'
                }`}
              >
                {plan.label} {plan.gender}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-background-100 rounded-lg border border-background-200 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div>
              <p className="text-sm font-medium text-foreground-500">
                {active.label} {active.gender} · 월 예상 보험료
              </p>
              <p className="mt-3 font-heading text-4xl md:text-5xl font-bold text-primary-600">
                {formatWon(active.premium)}
                <span className="text-lg md:text-xl font-semibold text-foreground-500">
                  원 부터
                </span>
              </p>
              <p className="mt-4 text-xs md:text-sm text-foreground-500 leading-relaxed">
                {active.note}
              </p>
              <a
                href="#consult"
                className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary-500 text-background-50 text-sm font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-calculator-line"></i> 내 보험료 계산하기
              </a>
            </div>

            <div className="bg-background-50 rounded-lg border border-background-200 p-5 md:p-6">
              <div className="flex items-center gap-2 text-accent-700">
                <i className="ri-shield-star-line text-lg"></i>
                <span className="text-sm font-semibold">이 연령대 추천 보장 구성</span>
              </div>
              <p className="mt-3 text-sm md:text-[15px] text-foreground-800 leading-relaxed">
                {active.coverage}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { label: '납입 기간', value: '20년납' },
                  { label: '보험 기간', value: '종신 / 100세' },
                  { label: '갱신 여부', value: '비갱신형' },
                  { label: '가입 심사', value: '일반 / 간편' },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="px-4 py-3 rounded-md bg-secondary-50 border border-secondary-200"
                  >
                    <p className="text-[11px] text-foreground-400">{spec.label}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground-800">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
