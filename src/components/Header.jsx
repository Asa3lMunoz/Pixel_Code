import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redireccionar

  // Verificar si el usuario ya está autenticado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    navigate("/FormularioIngresarPage"); // Redirige al formulario de login
  };

  const handleLogout = () => {
    setUser(null);
    setMenuOpen(false);
    localStorage.removeItem("user"); // Elimina la sesión del almacenamiento local
  };

  return (
    <header>
      <div className="headerdiv">
        
        {/* LOGO PIXEL CODE */}
        <div className="headerdiv-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Si el usuario está autenticado, muestra el icono de usuario y el menú */}
        {user ? (
          <div className="headerdiv-ingresar" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid fa-user"></i>

            {/* Menú Desplegable */}
            {menuOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/perfil">Perfil</Link></li>
                <li onClick={handleLogout}>Cerrar Sesión</li>
              </ul>
            )}
          </div>
        ) : (
          
          
          <button className="login-button" onClick={handleLogin}>
            Ingresar
          </button>
        )}
      </div>
    </header>
  );
}
