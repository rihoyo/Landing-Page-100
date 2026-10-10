import { useMemo, useState } from 'react';
import { insuranceProducts } from '@/mocks/insuranceProducts';

type SortKey = 'premium' | 'rating';

const formatWon = (value: number) => `${value.toLocaleString('ko-KR')}원`;

export default function ProductsSection() {
  const [sortKey, setSortKey] = useState<SortKey>('premium');
  const [tag, setTag] = useState<string>('전체');

  const tags = useMemo(() => {
    const all = insuranceProducts.flatMap((p) => p.tags);
    return ['전체', ...Array.from(new Set(all)).slice(0, 6)];
  }, []);

  const list = useMemo(() => {
    const filtered =
      tag === '전체' ? insuranceProducts : insuranceProducts.filter((p) => p.tags.includes(tag));
    return [...filtered].sort((a, b) =>
      sortKey === 'premium' ? a.monthlyPremium - b.monthlyPremium : b.rating - a.rating,
    );
  }, [sortKey, tag]);

  return (
    <section id="products" className="w-full bg-background-100 py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                <i className="ri-fire-line"></i> 인기 암보험 추천
              </span>
              <h2 className="mt-5 font-heading text-2xl md:text-4xl font-bold text-foreground-950 leading-snug">
                지금 가장 많이 비교한
                <br className="hidden sm:block" /> 암보험 상품
              </h2>
              <p className="mt-5 text-sm md:text-base text-foreground-600 leading-relaxed">
                실제 상담에서 인기가 높은 암보험 구성을 정리했습니다. 보험료는 가입 조건에 따라
                달라질 수 있어 상담을 통해 정확한 금액을 확인하는 것이 좋습니다.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-background-50 border border-background-200 rounded-full p-1 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setSortKey('premium')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  sortKey === 'premium'
                    ? 'bg-primary-500 text-background-50'
                    : 'text-foreground-600 hover:text-foreground-900'
                }`}
              >
                보험료 낮은 순
              </button>
              <button
                type="button"
                onClick={() => setSortKey('rating')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  sortKey === 'rating'
                    ? 'bg-primary-500 text-background-50'
                    : 'text-foreground-600 hover:text-foreground-900'
                }`}
              >
                만족도 높은 순
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTag(item)}
                className={`px-3.5 py-2 rounded-full text-xs md:text-[13px] font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                  tag === item
                    ? 'bg-secondary-900 text-background-50 border-secondary-900'
                    : 'bg-background-50 text-foreground-600 border-background-300 hover:border-secondary-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {list.map((product) => (
              <article
                key={product.id}
                className="bg-background-50 rounded-lg border border-background-200 p-5 md:p-6 flex flex-col hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-base md:text-lg font-bold text-foreground-950">
                    {product.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground-700 shrink-0">
                    <i className="ri-star-fill text-primary-500"></i>
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium text-accent-700 flex items-center gap-1.5">
                  <i className="ri-shield-check-line"></i>
                  {product.mainBenefit}
                </p>

                <p className="mt-3 text-xs text-foreground-500">{product.highlight}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-md bg-secondary-100 text-secondary-900 text-[11px] font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-background-200 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-foreground-400">{product.ageBasis}</p>
                    <p className="font-heading text-xl font-bold text-foreground-950">
                      월 {formatWon(product.monthlyPremium)}
                      <span className="text-xs font-medium text-foreground-400"> 부터</span>
                    </p>
                  </div>
                </div>

                <a
                  href="#consult"
                  className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary-500 text-background-50 text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  이 상품 상담 신청
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
