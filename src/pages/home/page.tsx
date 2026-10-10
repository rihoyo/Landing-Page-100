import SiteHeader from '@/components/feature/SiteHeader';
import SiteFooter from '@/components/feature/SiteFooter';
import FloatingContact from '@/components/feature/FloatingContact';
import HeroSection from '@/pages/home/components/HeroSection';
import CoverageSection from '@/pages/home/components/CoverageSection';
import ProductsSection from '@/pages/home/components/ProductsSection';
import PremiumSection from '@/pages/home/components/PremiumSection';
import ProcessSection from '@/pages/home/components/ProcessSection';
import FaqSection from '@/pages/home/components/FaqSection';
import ConsultSection from '@/pages/home/components/ConsultSection';

import HeroAlternative from './designs/HeroAlternative';

export default function Home({ pageId }: { pageId: 'aa0001' | 'aa0002' }) {
  return (
    <div className={`min-h-screen bg-background-50 design-${pageId}`} data-page-id={pageId}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css"
        precedence="icons"
      />
      <SiteHeader />
      <main>
        {pageId === 'aa0002' ? <HeroAlternative /> : <HeroSection />}
        <ConsultSection pageId={pageId} />
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
