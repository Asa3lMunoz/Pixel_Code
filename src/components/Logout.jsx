import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Login');
  };

  return (
    <button onClick={handleLogout} className="logout-link">
      🚪 Cerrar sesión
    </button>
  );
}

export default LogoutButton;