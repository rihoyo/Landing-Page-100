import { useEffect, useState } from "react";

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 md:right-6 bottom-6 z-40 flex flex-col gap-2 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href="#consult"
        className="relative w-14 h-14 rounded-full bg-primary-500 text-background-50 flex flex-col items-center justify-center text-[10px] font-semibold hover:bg-primary-600 transition-colors cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full bg-primary-500/60 animate-pulse-ring"></span>
        <i className="ri-customer-service-2-line text-lg"></i>
        상담신청
      </a>
      <button
        type="button"
        aria-label="맨 위로"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-14 h-14 rounded-full bg-background-50 border border-background-300 text-foreground-700 flex flex-col items-center justify-center text-[10px] font-semibold hover:bg-background-100 transition-colors cursor-pointer"
      >
        <i className="ri-arrow-up-line text-lg"></i>
        TOP
      </button>
    </div>
  );
}