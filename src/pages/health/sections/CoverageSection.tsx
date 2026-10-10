import { HealthArtwork } from '../Artwork';

// 보장 설명: 진단·치료·입원비 안내
export default function CoverageSection() {
  return (
    <section className="health-coverage">
      <div className="health-wrap">
        <h2>
          <em className="blue">진단/치료비</em>는 기본!
        </h2>
        <p className="section-description">
          <span>질병/상해 입원비, 수술비, 간병비까지</span> 꼼꼼하게 보장받으세요!
        </p>
        <div className="coverage-card">
          <span className="question-mark" aria-hidden="true">
            ?
          </span>
          <ul>
            <li>
              <em>응급실 내원비</em>도 보장해주는 상품은?
            </li>
            <li>
              <em>입원 첫날부터</em> 보장하는 상품은?!
            </li>
            <li>
              <em>동네 병원, 한방병원까지</em> 입원일당 보장하는 상품은?
            </li>
            <li>
              <em>진단비 / 수술비 / 입원비까지 한번에</em> 보장하는 상품은?
            </li>
            <li>
              <em>상해 / 질병 수술비</em>까지 보장하는 상품은?
            </li>
          </ul>
          <HealthArtwork name="adviser" />
          <span className="exclamation" aria-hidden="true">
            !
          </span>
        </div>
      </div>
    </section>
  );
}
