import { HealthArtwork } from '../Artwork';

// 상담 안내: 전문가 비교 상담과 가족 이미지
export default function ExpertSection() {
  return (
    <section className="health-expert">
      <div className="health-wrap">
        <h2>
          <em>건강보험 전문가</em>가
        </h2>
        <p className="expert-subtitle">속 시원하게 상담해드립니다!</p>
        <p className="expert-note">
          고객님의 상황을 고려하여 <strong>13개사 보험사의 다양한 상품</strong>을<br />
          한눈에 비교상담해드립니다!
        </p>
        <div className="expert-bottom">
          <div className="expert-circles">
            <span>
              월<br />
              보험료는?
            </span>
            <span>
              보장
              <br />
              금액은?
            </span>
            <span>
              상품
              <br />
              설계는?
            </span>
          </div>
          <HealthArtwork name="parent" />
          <HealthArtwork name="family" />
        </div>
      </div>
    </section>
  );
}
