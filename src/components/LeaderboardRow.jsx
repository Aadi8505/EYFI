export default function LeaderboardRow({ user, rank, onSelectUser }) {
  const badgeEmojis = {
    'Top Earner': '💰',
    'Streak Master': '🔥',
    'Early Bird': '🐦',
    'Full Streak': '⚡',
    'Code Wizard': '🧙',
    'Hustle Queen': '👑',
    'Product Star': '⭐',
    'Community Fav': '❤️',
    'Knowledge Guru': '📚',
    'Consistency King': '🏆',
    'Design Pro': '🎨',
    'Creator Mode': '🎬',
    'Rising Star': '🌟',
    'Fan Favorite': '😍',
    'Innovator': '💡',
    'Tech Titan': '🤖',
    'Digital Ninja': '🥷',
    'Artisan': '💎',
    'Hustler': '💪',
    'Eco Warrior': '🌿',
    'Foodie Hustler': '🍱',
    'Performer': '💃',
    'Wordsmith': '✍️',
    'Linguist': '🌐',
    'Global Hustler': '🌍',
    'Speed Demon': '🚀',
    'Tech Fixer': '🔧',
    'Reliability King': '🛡️',
  };

  return (
    <div
      className="leaderboard-row"
      onClick={() => onSelectUser(user)}
      style={{ animationDelay: `${rank * 0.05}s` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelectUser(user)}
    >
      <div className={`row-rank ${rank <= 3 ? 'top-3' : ''}`}>
        #{rank}
      </div>

      <div className="row-user">
        <img src={user.avatar} alt={user.name} className="row-avatar" />
        <div className="row-user-info">
          <div className="row-name">{user.name}</div>
          <div className="row-username">@{user.username}</div>
        </div>
      </div>

      <div className="row-method">{user.earningMethod}</div>

      <div className="row-earning">₹{user.totalEarned.toLocaleString('en-IN')}</div>

      <div className="row-streak">
        <span className="fire">🔥</span>
        {user.streak} days
      </div>

      <div className="row-badges">
        {user.badges.slice(0, 3).map((badge, i) => (
          <div key={i} className="mini-badge" title={badge}>
            {badgeEmojis[badge] || '🏅'}
          </div>
        ))}
      </div>
    </div>
  );
}
