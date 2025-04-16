import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import logo from '../img/logo.png';
import Logout from './Logout';


function Header() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <header>
      <div className='headerdiv'>

        <div className='headerdiv-logo'>
          <Link to="/">
            <img src={logo} alt="logo.png" />
          </Link>
        </div>




        <div className='headerdiv-boton-Login'>
  {user ? (
    <div className="menu-container">
      <button className="menu-button">
        {user.nombre} {user.apellido} ▾
      </button>
      <div className="menu-dropdown">
        <Link to="/UserProfile">👤 Perfil</Link>
        {user.rol === 'superAdmin' && (
          <Link to="/GodocuPage">⚙️ Admin</Link>
        )}
        <Logout/> 
      </div>
    </div>
  ) : (
    <Link to="/Login">Login</Link>
  )}
</div>



      </div>
    </header>
  );
}

export default Header;