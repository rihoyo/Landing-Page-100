import CompactForm from './CompactForm';
import HeroSection from './sections/HeroSection';
import StatisticsSection from './sections/StatisticsSection';
import CoverageSection from './sections/CoverageSection';
import ExpertSection from './sections/ExpertSection';
import BudgetSection from './sections/BudgetSection';
import './health.css';

// 화면 순서만 관리합니다. 각 영역의 내용과 표현은 sections 폴더에서 수정합니다.
export default function HealthPage() {
  return (
    <main className="health-page" data-page-id="aa0003">
      <HeroSection />
      <div className="health-wrap form-position">
        <CompactForm />
      </div>
      <StatisticsSection />
      <CoverageSection />
      <ExpertSection />
      <BudgetSection />
      <a className="health-bottom-cta" href="#consult">
        나에게 꼭 맞는 건강보험 <span>전문가에게 1:1 맞춤상담</span> 받으세요{' '}
        <b aria-hidden="true">›</b>
      </a>
    </main>
  );
}
