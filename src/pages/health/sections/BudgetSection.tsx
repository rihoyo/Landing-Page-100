import { HealthArtwork } from '../Artwork';

// 보험료 안내: 가입 형태와 부담 완화 설명
export default function BudgetSection() {
  return (
    <section className="health-budget">
      <div className="health-wrap">
        <h2>
          <span>100세 시대!</span> 납입할 보험금이 <em>부담</em>된다면?
        </h2>
        <p>
          고객님의 상황에 맞는 스마트한 보험가입으로
          <br />
          <strong>보험료 부담을 줄이고 실속은 더하세요!</strong>
        </p>
        <div className="budget-layout">
          <ul>
            {[
              '갱신형',
              '비갱신형',
              '순수보장형',
              '납입 면제형',
              '중도해지 환급금 지급형',
              '납입 후 50% 해지환급금 지급형',
            ].map((v) => (
              <li key={v}>{v}</li>
            ))}
            <li aria-hidden="true">•••</li>
          </ul>
          <HealthArtwork name="budget" />
        </div>
        <p className="budget-end">
          고객님의 상황에 맞게 <em>부담없는 선택</em>을 하실 수 있도록 도와드립니다!
        </p>
      </div>
    </section>
  );
}
