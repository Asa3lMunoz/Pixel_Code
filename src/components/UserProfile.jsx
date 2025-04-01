import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import email from "../img/iconos/Email.png";
import persona from "../img/iconos/infoPersona.png";
import tarjeta from "../img/iconos/iconoIdentificacion.png";
import telefono from "../img/iconos/Telefono.png";
import localizacion from "../img/iconos/Localizacion.png";
import Brujula from "../img/iconos/Brujula.png";

import { Link } from "react-router-dom";



function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    email: "",
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  });

  // Simulamos obtener los datos del usuario
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/contactRequests") // Reemplaza con tu API real
      .then(response => setUsuario(response.data))
      .catch(error => console.error("Error cargando usuario:", error));
  }, []);

  return (
    <>
      <Header />
    <div className="perfil-container">
      <h2 className="titulo" >Perfil</h2>
      <form>
        <div className="campo">
          <label>Email</label>
          <input className="input_campo" type="email" value={usuario.email} disabled />
          <img src={email} alt="" />

        </div>
        
        <div className="campo">
          <label>Nombre</label>
          <input className="input_campo" type="text" value={usuario.nombre} disabled />
          <img src={persona} alt="" />
        </div>
        
        <div className="campo">
          <label>Apellido</label>
          <input className="input_campo" type="text" value={usuario.apellido} disabled />
          <img src={persona} alt="" />
        </div>
        <div className="campo">
          <label>RUT</label>
          <input className="input_campo" type="text" value={usuario.rut} disabled />
          <img src={tarjeta} alt="" />
        </div>
        <div className="campo">
          <label>Teléfono</label>
          <input className="input_campo" type="text" value={usuario.telefono} disabled />
          <img src={telefono} alt="" />
        </div>
        <div className="campo">
          <label>Dirección</label>
          <input className="input_campo" type="text" value={usuario.direccion} disabled />
          <img src={localizacion} alt="" />
        </div>
        <div className="campo">
          <label>Ciudad</label>
          <input className="input_campo" type="text" value={usuario.ciudad} disabled />
          <img src={Brujula} alt="" />
        </div>

        <div className="UserPerfil_botones">
          <button type="submit" className="boton-guardar">Guardar</button>
          <button type="submit" className="boton-cancelar">Cancelar</button>
        </div>

    
      </form>
      
    </div>
    

    <Footer />
    </>
  );
}

export default PerfilUsuario;
