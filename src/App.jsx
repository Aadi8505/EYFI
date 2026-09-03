import { useState, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Podium from './components/Podium';
import LeaderboardRow from './components/LeaderboardRow';
import ProfileModal from './components/ProfileModal';
import userData from './data/users';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('totalEarned');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [likedUsers, setLikedUsers] = useState(new Set());
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [toast, setToast] = useState(null);

  // Earning method categories
  const categories = useMemo(() => {
    const methods = [...new Set(userData.map(u => {
      if (u.earningMethod.toLowerCase().includes('freelanc') ||
          u.earningMethod.toLowerCase().includes('design') ||
          u.earningMethod.toLowerCase().includes('writing') ||
          u.earningMethod.toLowerCase().includes('edit') ||
          u.earningMethod.toLowerCase().includes('social media') ||
          u.earningMethod.toLowerCase().includes('web dev') ||
          u.earningMethod.toLowerCase().includes('translation') ||
          u.earningMethod.toLowerCase().includes('bot') ||
          u.earningMethod.toLowerCase().includes('automat'))
        return 'Services & Freelancing';
      if (u.earningMethod.toLowerCase().includes('sell') ||
          u.earningMethod.toLowerCase().includes('print') ||
          u.earningMethod.toLowerCase().includes('bak') ||
          u.earningMethod.toLowerCase().includes('candle') ||
          u.earningMethod.toLowerCase().includes('jewel') ||
          u.earningMethod.toLowerCase().includes('thrift') ||
          u.earningMethod.toLowerCase().includes('tiffin'))
        return 'Products & Selling';
      if (u.earningMethod.toLowerCase().includes('tutor') ||
          u.earningMethod.toLowerCase().includes('workshop') ||
          u.earningMethod.toLowerCase().includes('teach') ||
          u.earningMethod.toLowerCase().includes('dance'))
        return 'Teaching & Coaching';
      if (u.earningMethod.toLowerCase().includes('photo') ||
          u.earningMethod.toLowerCase().includes('repair') ||
          u.earningMethod.toLowerCase().includes('deliver'))
        return 'Other Services';
      return 'Other Services';
    }))];
    return ['all', ...methods.sort()];
  }, []);

  // Categorize users
  const getUserCategory = useCallback((user) => {
    const m = user.earningMethod.toLowerCase();
    if (m.includes('freelanc') || m.includes('design') || m.includes('writing') ||
        m.includes('edit') || m.includes('social media') || m.includes('web dev') ||
        m.includes('translation') || m.includes('bot') || m.includes('automat'))
      return 'Services & Freelancing';
    if (m.includes('sell') || m.includes('print') || m.includes('bak') ||
        m.includes('candle') || m.includes('jewel') || m.includes('thrift') ||
        m.includes('tiffin'))
      return 'Products & Selling';
    if (m.includes('tutor') || m.includes('workshop') || m.includes('teach') ||
        m.includes('dance'))
      return 'Teaching & Coaching';
    return 'Other Services';
  }, []);

  // Sort and filter
  const sortedUsers = useMemo(() => {
    let users = [...userData];

    // Filter by category
    if (filterCategory !== 'all') {
      users = users.filter(u => getUserCategory(u) === filterCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.earningMethod.toLowerCase().includes(q) ||
        u.college.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q)
      );
    }

    // Sort
    users.sort((a, b) => {
      switch (sortBy) {
        case 'totalEarned': return b.totalEarned - a.totalEarned;
        case 'highestIncome': return b.highestIncome - a.highestIncome;
        case 'streak': return b.streak - a.streak;
        case 'daysActive': return b.daysActive - a.daysActive;
        case 'transactions': return b.transactions - a.transactions;
        case 'name': return a.name.localeCompare(b.name);
        default: return b.totalEarned - a.totalEarned;
      }
    });

    return users;
  }, [searchQuery, sortBy, filterCategory, getUserCategory]);

  // Get rank of a user (based on total earnings, regardless of filter)
  const getUserRank = useCallback((userId) => {
    const allSorted = [...userData].sort((a, b) => b.totalEarned - a.totalEarned);
    return allSorted.findIndex(u => u.id === userId) + 1;
  }, []);

  // Top 3 by default sort (earnings)
  const topThree = useMemo(() => {
    return [...userData].sort((a, b) => b.totalEarned - a.totalEarned).slice(0, 3);
  }, []);

  // Aggregate stats
  const totalEarnings = useMemo(() => userData.reduce((sum, u) => sum + u.totalEarned, 0), []);
  const avgEarning = useMemo(() => totalEarnings / userData.length, [totalEarnings]);

  // Show toast
  const showToast = useCallback((message, icon = '✅') => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Like / Follow handlers
  const handleLike = useCallback((userId) => {
    setLikedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
        showToast('Removed like', '💔');
      } else {
        next.add(userId);
        showToast('Profile liked!', '❤️');
      }
      return next;
    });
  }, [showToast]);

  const handleFollow = useCallback((userId) => {
    setFollowedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
        showToast('Unfollowed', '👋');
      } else {
        next.add(userId);
        showToast('Now following!', '🎉');
      }
      return next;
    });
  }, [showToast]);

  // Remaining users (after top 3, if no filters active)
  const remainingUsers = useMemo(() => {
    if (filterCategory !== 'all' || searchQuery.trim()) {
      return sortedUsers;
    }
    const topIds = new Set(topThree.map(u => u.id));
    return sortedUsers.filter(u => !topIds.has(u.id));
  }, [sortedUsers, topThree, filterCategory, searchQuery]);

  const showPodium = filterCategory === 'all' && !searchQuery.trim() && sortBy === 'totalEarned';

  return (
    <div className="app">
      <Navbar />
      <Hero
        totalParticipants={userData.length}
        totalEarnings={totalEarnings}
        avgEarning={avgEarning}
      />

      {/* Controls */}
      <div className="controls">
        <div className="controls-top">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, college, city, or method..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="leaderboard-search"
            />
          </div>
        </div>

        <div className="controls-bottom">
          <div className="filter-group">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="leaderboard-sort"
          >
            <option value="totalEarned">Sort: Total Earned</option>
            <option value="highestIncome">Sort: Peak Income</option>
            <option value="streak">Sort: Streak</option>
            <option value="daysActive">Sort: Days Active</option>
            <option value="transactions">Sort: Transactions</option>
            <option value="name">Sort: Name (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="leaderboard-container">
        {/* Top 3 Podium */}
        {showPodium && (
          <Podium
            topThree={topThree}
            onSelectUser={setSelectedUser}
          />
        )}

        {/* List Header */}
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Participant</span>
          <span>Hustle</span>
          <span>Earned</span>
          <span>Streak</span>
          <span>Badges</span>
        </div>

        {/* Leaderboard Rows */}
        <div className="leaderboard-list">
          {remainingUsers.length > 0 ? (
            remainingUsers.map((user, i) => {
              const rank = getUserRank(user.id);
              return (
                <LeaderboardRow
                  key={user.id}
                  user={user}
                  rank={rank}
                  onSelectUser={setSelectedUser}
                />
              );
            })
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-tertiary)',
              fontSize: '15px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              No participants found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <ProfileModal
          user={selectedUser}
          rank={getUserRank(selectedUser.id)}
          onClose={() => setSelectedUser(null)}
          onLike={handleLike}
          onFollow={handleFollow}
          isLiked={likedUsers.has(selectedUser.id)}
          isFollowing={followedUsers.has(selectedUser.id)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <span className="toast-icon">{toast.icon}</span>
          {toast.message}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          India's largest Student Earning Challenge. An initiative by{' '}
          <a href="https://www.polygnan.org" target="_blank" rel="noopener noreferrer">Polygnan</a>.
        </p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          © 2026 EYFI Challenge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
