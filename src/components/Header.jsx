import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site__header">
      <nav className="site__nav">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            Cine<span>Verse</span>
          </Link>
        </div>

        <button
          className={`menu__toggle ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          id="primary-navigation"
          className={`nav__links ${menuOpen ? "nav__open" : ""}`}
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/discover" onClick={closeMenu}>
            Discover
          </NavLink>

          <NavLink to="/genres" onClick={closeMenu}>
            Genres
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;

