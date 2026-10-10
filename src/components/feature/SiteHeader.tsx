import { useEffect, useState } from 'react';

const navItems = [
  { id: 'coverage', label: '보장 안내' },
  { id: 'products', label: '추천 상품' },
  { id: 'premium', label: '연령대별 보험료' },
  { id: 'process', label: '상담 절차' },
  { id: 'faq', label: '자주 묻는 질문' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-50/95 backdrop-blur border-b border-background-200'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 cursor-pointer">
          <img
            src={
              import.meta.env.BASE_URL +
              'assets/89857fcd-7bde-41a9-836d-73ce02da10d5_compressed__CI__.webp'
            }
            alt="MEGA GA 금융그룹 로고"
            title="MEGA GA 금융그룹"
            className="h-8 md:h-[50px] w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[15px] font-medium text-foreground-700 hover:text-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="#consult"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-md bg-primary-500 text-background-50 text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            무료 상담 신청
          </a>
          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md text-foreground-900 hover:bg-background-100 cursor-pointer"
          >
            <i className={menuOpen ? 'ri-close-line text-2xl' : 'ri-menu-line text-2xl'}></i>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background-50 border-b border-background-200 px-4 py-4">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-[15px] font-medium text-foreground-800 border-b border-background-100 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#consult"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-md bg-primary-500 text-background-50 text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              무료 상담 신청
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
