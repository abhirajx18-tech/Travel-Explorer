import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ✈️ Travel Explorer
        </Link>

        <div className="navbar-menu">
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/countries" onClick={() => setIsMenuOpen(false)}>
                Countries
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                ❤️ Favorites
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
          </ul>

          <Link to="/user/1" className="profile-link" onClick={() => setIsMenuOpen(false)} aria-label="Profile">
            👤
          </Link>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
