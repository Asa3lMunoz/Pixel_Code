import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Sesión cerrada.');
    navigate('/Login');
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
}

export default LogoutButton;