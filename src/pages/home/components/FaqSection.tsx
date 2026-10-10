import { useState } from 'react';
import { faqs } from '@/mocks/reviews';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <section id="faq" className="w-full bg-background-50 py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-100 text-secondary-900 text-xs font-semibold">
              <i className="ri-question-line"></i> 자주 묻는 질문
            </span>
            <h2 className="mt-5 font-heading text-2xl md:text-4xl font-bold text-foreground-950 leading-snug">
              상담 전에 가장 많이
              <br className="hidden sm:block" /> 궁금해하시는 것들
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-lg border transition-colors ${
                    isOpen
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-background-200 bg-background-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left cursor-pointer"
                  >
                    <span className="flex items-start gap-3">
                      <span className="font-heading text-sm md:text-base font-bold text-primary-600">
                        Q.
                      </span>
                      <span className="text-sm md:text-base font-semibold text-foreground-900">
                        {faq.question}
                      </span>
                    </span>
                    <span className="shrink-0 w-7 h-7 rounded-full bg-background-100 text-foreground-600 flex items-center justify-center">
                      <i className={isOpen ? 'ri-subtract-line' : 'ri-add-line'}></i>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <div className="flex items-start gap-3">
                        <span className="font-heading text-sm md:text-base font-bold text-accent-600">
                          A.
                        </span>
                        <p className="text-sm md:text-[15px] text-foreground-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
