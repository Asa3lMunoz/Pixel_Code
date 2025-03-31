import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
        
        <label>Email</label>
        <div className="campo">
        <input type="email" value={usuario.email} disabled />
        </div>
        <div className="campo">
        <label>Nombre</label>
        <input type="text" value={usuario.nombre} disabled />
        </div>
        <div className="campo">
        <label>Apellido</label>
        <input type="text" value={usuario.apellido} disabled />
        </div>
        <div className="campo">
        <label>RUT</label>
        <input type="text" value={usuario.rut} disabled />
        </div>
        <div className="campo">
        <label>Teléfono</label>
        <input type="text" value={usuario.telefono} disabled />
        </div>
        <div className="campo">
        <label>Dirección</label>
        <input type="text" value={usuario.direccion} disabled />
        </div>
        <div className="campo">
        <label>Ciudad</label>
        <input type="text" value={usuario.ciudad} disabled />
        </div>
        <button type="submit" className="boton-guardar">Guardar</button>
    
    
        <button type="submit" className="boton-cancelar">Cancelar</button>
    
      </form>
      
    </div>
    

    <Footer />
    </>
  );
}

export default PerfilUsuario;
