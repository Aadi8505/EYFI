export default function Hero({ totalParticipants, totalEarnings, avgEarning }) {
  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="dot"></span>
        Wave 01 — Live Rankings
      </div>

      <h1>
        <span className="accent">LEADERBOARD</span>
      </h1>

      <p className="subtitle">
        See who's crushing it in India's largest student earning challenge.
        30 days. Real income. Real hustle.
      </p>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">{totalParticipants}</div>
          <div className="stat-label">Participants</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">₹{(totalEarnings / 1000).toFixed(1)}K</div>
          <div className="stat-label">Total Earned</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">₹{(avgEarning / 1000).toFixed(1)}K</div>
          <div className="stat-label">Avg Earning</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">30</div>
          <div className="stat-label">Days</div>
        </div>
      </div>
    </section>
  );
}
