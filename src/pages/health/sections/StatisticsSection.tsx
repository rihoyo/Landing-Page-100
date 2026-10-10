// 질병 통계: 사망률 그래프와 안내
export default function StatisticsSection() {
  return (
    <section className="health-stat health-wrap">
      <p className="section-eyebrow">통계청 자료 참고</p>
      <h2>
        2020년 주요 <em>사망원인 3대 질병</em>
      </h2>
      <div className="stat-layout">
        <div className="stat-bars">
          <small>사망률, 단위: 명 (인구 10만 명당)</small>
          {[
            { rank: '1위', name: '암', value: 160.1, width: 100 },
            { rank: '2위', name: '심장질환', value: 63, width: 39.4 },
            { rank: '4위', name: '뇌혈관질환', value: 42.6, width: 26.6 },
          ].map((r, i) => (
            <div className={`stat-row stat-row-${i}`} key={r.name}>
              <span style={{ width: `${r.width}%` }}>{r.rank}</span>
              <strong>{r.name}</strong>
              <b>{r.value}</b>
            </div>
          ))}
        </div>
        <div className="stat-message">
          <div className="organ-icons" aria-hidden="true">
            <span>♡</span>
            <span>♧</span>
            <span>◎</span>
          </div>
          <p>꼭 치료해야 하는 3대 질병!</p>
          <strong>건강보험은 선택 아닌 필수!</strong>
        </div>
      </div>
    </section>
  );
}
