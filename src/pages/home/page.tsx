import SiteHeader from "@/components/feature/SiteHeader";
import SiteFooter from "@/components/feature/SiteFooter";
import FloatingContact from "@/components/feature/FloatingContact";
import HeroSection from "@/pages/home/components/HeroSection";
import CoverageSection from "@/pages/home/components/CoverageSection";
import ProductsSection from "@/pages/home/components/ProductsSection";
import PremiumSection from "@/pages/home/components/PremiumSection";
import ProcessSection from "@/pages/home/components/ProcessSection";
import FaqSection from "@/pages/home/components/FaqSection";
import ConsultSection from "@/pages/home/components/ConsultSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <SiteHeader />
      <main>
        <HeroSection />
        <ConsultSection />
        <CoverageSection />
        <ProductsSection />
        <PremiumSection />
        <ProcessSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}