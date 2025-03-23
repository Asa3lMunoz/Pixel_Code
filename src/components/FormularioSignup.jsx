import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";




export default function FormularioSignup() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    repetirContraseña: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contraseña !== formData.repetirContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="formulario-container">
      <h2 className="titulo">Bienvenido a PixelCode!</h2>
      <p className="subtitulo">Ingresa tus datos para crear tu cuenta</p>

      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="nombre">
            <span className="obligatorio">*</span> Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="apellido">
            <span className="obligatorio">*</span> Apellido:
          </label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="email">
            <span className="obligatorio">*</span> Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="contraseña">
            <span className="obligatorio">*</span> Contraseña:
          </label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="repetirContraseña">
            <span className="obligatorio">*</span> Repetir Contraseña:
          </label>
          <input
            type="password"
            name="repetirContraseña"
            value={formData.repetirContraseña}
            onChange={handleChange}
            placeholder="Repetir contraseña"
            required
          />
        </div>

        <button type="submit" className="boton-registrar">
          Registrarme
        </button>

        <p className="texto-login">
          Si ya tienes tu cuenta, ingresa{" "}
          <span>
            <Link to="/FormularioIngresarPage">aquí</Link>
          </span>
        </p>
      </form>

    

    </div>
  );
}
