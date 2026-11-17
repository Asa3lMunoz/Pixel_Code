import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import HomeFooter from '../components/HomeFooter';
import '../styles/homepage.css';
import '../styles/auth.css';

export default function FormularioIngresarPage() {
  const [Email, SetEmail] = useState('');
  const [pass, SetPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const consultarApi = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const respAPi = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: Email, password: pass }),
      });

      if (respAPi.ok) {
        const datosApi = await respAPi.json();
        if (datosApi.success === true) {
          const datosU = datosApi.user;
          let assignedRole = 'Cliente';
          datosApi.user.roles.forEach((rol) => {
            if (rol === 'superAdmin') assignedRole = 'superAdmin';
          });
          localStorage.setItem('user', JSON.stringify({
            nombre: datosU.firstName,
            apellido: datosU.lastName,
            rol: assignedRole,
            uid: datosApi.user.uid,
          }));
          SetEmail('');
          SetPass('');
          navigate('/');
        } else {
          setError(datosApi.error || 'Email o contraseña incorrectos.');
        }
      } else {
        setError('Email o contraseña incorrectos.');
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-home">
      <HomeHeader />
      <div className="auth-page">
      <div className="auth-glow auth-glow-1" />
      <div className="auth-glow auth-glow-2" />

      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="logo-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Pixel<b>Code</b></span>
        </Link>

        <div className="auth-header">
          <h2>Bienvenido de vuelta</h2>
          <p>Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={consultarApi} noValidate>
          <label>
            Correo electrónico
            <input
              type="email"
              placeholder="tu@correo.com"
              required
              value={Email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              placeholder="••••••••"
              required
              value={pass}
              onChange={(e) => SetPass(e.target.value)}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="auth-links">
          <p>¿No tienes cuenta? <Link to="/Signup">Regístrate aquí</Link></p>
          <p>¿Olvidaste tu contraseña? <Link to="/LostPassword">Recupérala aquí</Link></p>
        </div>
      </div>
      </div>
      <HomeFooter />
    </div>
  );
}
