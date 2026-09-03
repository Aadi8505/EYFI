export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="https://eyfichallenge.com" className="navbar-brand" target="_blank" rel="noopener noreferrer">
        <img src="/eyfi-logo.png" alt="EYFI" className="navbar-logo-img" />
      </a>

      <ul className="navbar-links">
        <li><a href="https://eyfichallenge.com/how-it-works" target="_blank" rel="noopener noreferrer">How it works</a></li>
        <li><a href="https://eyfichallenge.com/prizes" target="_blank" rel="noopener noreferrer">Prizes</a></li>
        <li><a href="#" className="active">Leaderboard</a></li>
        <li><a href="https://forms.gle/CTYk7fk1TbgLcHZa7" target="_blank" rel="noopener noreferrer">Become an Ambassador</a></li>
      </ul>

      <a href="https://eyfichallenge.com" target="_blank" rel="noopener noreferrer">
        <button className="btn-join">JOIN</button>
      </a>
    </nav>
  );
}
