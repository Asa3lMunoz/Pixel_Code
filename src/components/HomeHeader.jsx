import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <Link to="/" className="logo" aria-label="PixelCode - Inicio">
          <span className="logo-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Pixel<b>Code</b></span>
        </Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="/#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
          <li><a href="/#a-medida" onClick={() => setMenuOpen(false)}>A medida</a></li>
          <li><a href="/#proceso" onClick={() => setMenuOpen(false)}>Proceso</a></li>
          <li><a href="/#tecnologias" onClick={() => setMenuOpen(false)}>Tecnologías</a></li>
          <li><a href="/#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a></li>
        </ul>

        <div className="nav-auth">
          {user ? (
            <div className="menu-container" ref={userMenuRef}>
              <button className="menu-button" onClick={() => setUserMenuOpen((o) => !o)}>
                {user.nombre} {user.apellido} ▾
              </button>
              {userMenuOpen && (
                <div className="menu-dropdown" style={{ display: 'block' }}>
                  <Link to="/UserProfile" onClick={() => setUserMenuOpen(false)}>👤 Perfil</Link>
                  {user.rol === 'superAdmin' && (
                    <Link to="/GodocuPage" onClick={() => setUserMenuOpen(false)}>⚙️ Admin</Link>
                  )}
                  <Logout />
                </div>
              )}
            </div>
          ) : (
            <Link to="/Login" className="btn-login">Login</Link>
          )}
          <a href="/#contacto" className="btn btn-primary btn-nav">Cotiza tu proyecto</a>
        </div>

        <button
          className={`burger${menuOpen ? ' open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
