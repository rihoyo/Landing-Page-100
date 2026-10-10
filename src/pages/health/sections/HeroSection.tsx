import { HealthArtwork } from '../Artwork';

// 첫 화면: 제목과 대표 이미지
export default function HeroSection() {
  return (
    <section className="health-hero">
      <div className="health-wrap hero-layout">
        <div className="hero-copy">
          <p className="hero-ribbon">큰돈 드는 3대 질환</p>
          <p className="hero-subline">실비보험만으로는 역부족!</p>
          <h1>
            <strong>필수 건강보험</strong>
            <span>나에게 꼭 맞는</span>합리적 상품은?
          </h1>
        </div>
        <HealthArtwork name="hero" priority />
      </div>
    </section>
  );
}
