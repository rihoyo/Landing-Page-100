const trustPoints = [
  { icon: "ri-shield-check-line", label: "보험대리점 정식 등록" },
  { icon: "ri-wallet-3-line", label: "비교·상담 100% 무료" },
  { icon: "ri-user-star-line", label: "전문 상담사 1:1 배정" },
];

export default function HeroSection() {
  return (
    <section id="top" className="relative w-full overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-background-50 to-background-50"></div>
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-200/50 blur-3xl"></div>
      <div className="absolute top-24 -right-20 w-96 h-96 rounded-full bg-accent-100/60 blur-3xl"></div>

      <div className="relative w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="animate-float-up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background-50 border border-primary-200 text-primary-700 text-xs md:text-[13px] font-semibold">
              <i className="ri-award-line"></i> 대한민국 대표 암보험 무료 비교
            </span>

            <h1 className="mt-6 font-heading text-3xl md:text-5xl font-bold text-foreground-950 leading-[1.25] md:leading-[1.2]">
              내 조건에 맞는 암보험,
              <br />
              <span className="text-primary-600">1분이면 비교 끝</span>
            </h1>

            <p className="mt-6 text-sm md:text-lg text-foreground-600 leading-relaxed max-w-xl">
              여러 보험사의 암보험을 보장과 보험료 기준으로 한 번에 비교해 드립니다.
              <br className="hidden sm:block" />
              어렵고 복잡한 보장 내용, 전문 상담사가 알기 쉽게 정리해 드려요.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#consult"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-primary-500 text-background-50 text-base font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-file-list-3-line"></i> 무료 상담 신청하기
              </a>
            </div>

            <p className="mt-3.5 flex items-center gap-1.5 text-xs md:text-[13px] text-foreground-500">
              <i className="ri-arrow-down-line text-primary-500"></i>
              바로 아래 신청서에 이름과 연락처만 남겨주시면 무료로 상담해 드려요
            </p>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {trustPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center">
                    <i className={`${point.icon} text-base`}></i>
                  </span>
                  <span className="text-xs md:text-sm font-medium text-foreground-700">
                    {point.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-float-up">
            <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary-100/60 blur-2xl"></div>
              <img
                src={import.meta.env.BASE_URL + "assets/c9ae78f9-2afa-49a7-ae44-00344ca802c5_compressed_db8045c7-9d41-4304-8034-a71688d8706e.webp"}
                alt="돋보기로 암 보장 내용을 꼼꼼히 살펴보는 3D 일러스트"
                title="암보험 보장 비교 무료 상담"
                className="relative w-full h-full object-contain animate-float-soft"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}