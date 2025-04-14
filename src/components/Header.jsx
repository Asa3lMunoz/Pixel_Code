import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import logo from '../img/logo.png';

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
            <Link to="/Contacto" >
              {user.nombre} {user.apellido}
            </Link>
          ) : (
            <Link to="/Login">
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;