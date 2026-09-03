import { useState, useEffect } from 'react';

export default function ProfileModal({ user, rank, onClose, onLike, onFollow, isLiked, isFollowing }) {
  const [animateChart, setAnimateChart] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Delay chart animation for visual effect
    const timer = setTimeout(() => setAnimateChart(true), 300);

    // Close on Escape key
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const maxEarning = Math.max(...user.weeklyEarnings);
  const weekLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

  const getRankBadgeClass = () => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return 'default';
  };

  const getRankLabel = () => {
    if (rank === 1) return '🥇 #1 — Top Earner';
    if (rank === 2) return '🥈 #2 — Runner Up';
    if (rank === 3) return '🥉 #3 — Second Runner Up';
    return `#${rank}`;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleShare = () => {
    const text = `Check out ${user.name}'s profile on the EYFI Challenge Leaderboard! They've earned ₹${user.totalEarned.toLocaleString('en-IN')} through ${user.earningMethod}. 🚀`;
    if (navigator.share) {
      navigator.share({ title: 'EYFI Leaderboard', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const badgeEmojis = {
    'Top Earner': '💰', 'Streak Master': '🔥', 'Early Bird': '🐦',
    'Full Streak': '⚡', 'Code Wizard': '🧙', 'Hustle Queen': '👑',
    'Product Star': '⭐', 'Community Fav': '❤️', 'Knowledge Guru': '📚',
    'Consistency King': '🏆', 'Design Pro': '🎨', 'Creator Mode': '🎬',
    'Rising Star': '🌟', 'Fan Favorite': '😍', 'Innovator': '💡',
    'Tech Titan': '🤖', 'Digital Ninja': '🥷', 'Artisan': '💎',
    'Hustler': '💪', 'Eco Warrior': '🌿', 'Foodie Hustler': '🍱',
    'Performer': '💃', 'Wordsmith': '✍️', 'Linguist': '🌐',
    'Global Hustler': '🌍', 'Speed Demon': '🚀', 'Tech Fixer': '🔧',
    'Reliability King': '🛡️',
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Banner */}
        <div className="modal-banner">
          <div className={`modal-rank-badge ${getRankBadgeClass()}`}>
            {getRankLabel()}
          </div>
        </div>

        {/* Profile */}
        <div className="modal-profile">
          <div className="modal-avatar-section">
            <img src={user.avatar} alt={user.name} className="modal-avatar" />
            <div className="modal-user-info">
              <div className="modal-name">{user.name}</div>
              <div className="modal-username">@{user.username}</div>
              <div className="modal-tagline">{user.tagline}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              className={`action-btn follow ${isFollowing ? 'following' : ''}`}
              onClick={() => onFollow(user.id)}
            >
              {isFollowing ? '✓ Following' : '+ Follow'}
            </button>
            <button
              className={`action-btn like ${isLiked ? 'liked' : ''}`}
              onClick={() => onLike(user.id)}
            >
              <span className="heart">{isLiked ? '❤️' : '🤍'}</span>
              {isLiked ? user.likes + 1 : user.likes}
            </button>
            <button className="action-btn share" onClick={handleShare}>
              📤 {copied ? 'Copied!' : 'Share'}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="modal-stats-grid">
            <div className="modal-stat-card">
              <div className="modal-stat-icon">💰</div>
              <div className="modal-stat-value accent">₹{user.totalEarned.toLocaleString('en-IN')}</div>
              <div className="modal-stat-label">Total Earned</div>
            </div>
            <div className="modal-stat-card">
              <div className="modal-stat-icon">📈</div>
              <div className="modal-stat-value">₹{user.highestIncome.toLocaleString('en-IN')}</div>
              <div className="modal-stat-label">Peak Income</div>
            </div>
            <div className="modal-stat-card">
              <div className="modal-stat-icon">🔥</div>
              <div className="modal-stat-value">{user.streak}</div>
              <div className="modal-stat-label">Day Streak</div>
            </div>
            <div className="modal-stat-card">
              <div className="modal-stat-icon">🤝</div>
              <div className="modal-stat-value">{user.transactions}</div>
              <div className="modal-stat-label">Transactions</div>
            </div>
          </div>

          {/* Bio */}
          <div className="modal-section">
            <div className="modal-section-title">About</div>
            <p className="modal-bio">{user.bio}</p>
          </div>

          {/* Details */}
          <div className="modal-section">
            <div className="modal-section-title">Details</div>
            <div className="modal-details-grid">
              <div className="detail-item">
                <div className="detail-icon">🎓</div>
                <div className="detail-text">
                  <span className="detail-label">College</span>
                  <span className="detail-value">{user.college}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">📍</div>
                <div className="detail-text">
                  <span className="detail-label">City</span>
                  <span className="detail-value">{user.city}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">🛠️</div>
                <div className="detail-text">
                  <span className="detail-label">Hustle</span>
                  <span className="detail-value">{user.earningMethod}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">📅</div>
                <div className="detail-text">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">{formatDate(user.memberSince)}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">⏱️</div>
                <div className="detail-text">
                  <span className="detail-label">Days Active</span>
                  <span className="detail-value">{user.daysActive} / 30 days</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">👥</div>
                <div className="detail-text">
                  <span className="detail-label">Followers</span>
                  <span className="detail-value">{isFollowing ? user.followers + 1 : user.followers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="modal-section">
            <div className="modal-section-title">Badges Earned</div>
            <div className="modal-badges">
              {user.badges.map((badge, i) => (
                <div key={i} className="badge">
                  <span>{badgeEmojis[badge] || '🏅'}</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Earnings Chart */}
          <div className="modal-section">
            <div className="modal-section-title">Weekly Earnings</div>
            <div className="modal-chart">
              <div className="chart-bars">
                {user.weeklyEarnings.map((val, i) => (
                  <div key={i} className="chart-bar-group">
                    <div
                      className="chart-bar"
                      style={{
                        height: animateChart ? `${(val / maxEarning) * 100}%` : '0%',
                        transitionDelay: `${i * 0.08}s`,
                      }}
                    >
                      <div className="chart-bar-value">₹{val.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="chart-bar-label">{weekLabels[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="modal-section">
            <div className="modal-section-title">Connect</div>
            <div className="modal-social">
              {user.socialLinks.instagram && (
                <a href="#" className="social-link" onClick={(e) => e.preventDefault()}>
                  📷 {user.socialLinks.instagram}
                </a>
              )}
              {user.socialLinks.linkedin && (
                <a href="#" className="social-link" onClick={(e) => e.preventDefault()}>
                  💼 {user.socialLinks.linkedin}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
