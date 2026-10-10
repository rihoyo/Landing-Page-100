import './alternative.css';
export default function HeroAlternative() {
  return (
    <section id="top" className="alternative-hero">
      <div className="alternative-hero-inner">
        <div className="alternative-copy">
          <span className="alternative-eyebrow">
            <i className="ri-shield-check-line" /> 나를 위한 암보험 비교
          </span>
          <h1>
            내 조건에 맞는 암보험,
            <br />
            <em>1분이면 비교 끝</em>
          </h1>
          <p>
            여러 보험사의 보장과 보험료를 한 번에.
            <br />
            복잡한 암보험, 전문 상담사와 쉽게 비교하세요.
          </p>
          <a className="alternative-cta" href="#consult">
            무료 상담 신청하기 <i className="ri-arrow-right-line" />
          </a>
          <div className="alternative-assurance">
            <span>
              <i className="ri-check-line" /> 비교·상담 100% 무료
            </span>
            <span>
              <i className="ri-check-line" /> 전문 상담사 1:1 배정
            </span>
          </div>
        </div>
        <div className="alternative-art">
          <div className="alternative-orbit" />
          <img
            src={
              import.meta.env.BASE_URL +
              'assets/c9ae78f9-2afa-49a7-ae44-00344ca802c5_compressed_db8045c7-9d41-4304-8034-a71688d8706e.webp'
            }
            alt="돋보기로 암보험 보장을 비교하는 일러스트"
          />
          <div className="alternative-float">
            <i className="ri-shield-check-line" />
            <div>
              <strong>보장은 꼼꼼하게</strong>
              <span>나에게 필요한 보장부터 확인</span>
            </div>
          </div>
        </div>
      </div>
      <div className="alternative-strip">
        <span>여러 보험사 한 번에 비교</span>
        <b>·</b>
        <span>내 조건에 맞는 보장 안내</span>
        <b>·</b>
        <span>가입 강요 없는 무료 상담</span>
      </div>
    </section>
  );
}
