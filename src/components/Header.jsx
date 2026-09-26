import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
     <nav>
      <div className="logo">
        <Link to="/">
          Cine<span>Verse</span>
        </Link>
      </div>
      <div className="nav__links">
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/about">About</Link>
      </div>
     </nav>
    </header>
  );
}

export default Header;
