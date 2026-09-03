export default function Podium({ topThree, onSelectUser }) {
  if (topThree.length < 3) return null;

  return (
    <div className="podium">
      {topThree.map((user, i) => {
        const rankClass = `rank-${i + 1}`;
        return (
          <div
            key={user.id}
            className={`podium-card ${rankClass}`}
            onClick={() => onSelectUser(user)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectUser(user)}
          >
            <div className="podium-rank">{i + 1}</div>
            {i === 0 && <div className="crown">👑</div>}
            <img
              src={user.avatar}
              alt={user.name}
              className="podium-avatar"
            />
            <div className="podium-name">{user.name}</div>
            <div className="podium-method">{user.earningMethod}</div>
            <div className="podium-earning">₹{user.totalEarned.toLocaleString('en-IN')}</div>
            <div className="podium-college">{user.college}</div>
          </div>
        );
      })}
    </div>
  );
}
