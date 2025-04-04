import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Formulario() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const EjecutarApi = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/v1/contactRequests', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombres: firstName, 
              apellidos: lastName, 
              email: email,
              telefono: phone, 
              mensaje: message, 
              reviewed: false,
              answered: false,
            }),
          });

      if (response.ok) {
        console.log("Mensaje enviado correctamente sin error");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
        navigate('/Contacto');
      } else {
        console.error("Error al enviar el mensaje:", response.status);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <>
      <div className="formulariodiv">
        <form onSubmit={EjecutarApi} className="FormularioMensaje">
          <div className="formulariodiv-text">
            <h2>Contacto</h2>
            <p>
              Escuchamos tus propuestas e ideas por locas que sean!<br />
              Completa el formulario y te contactaremos lo antes posible
            </p>
          </div>

          <div className="formulariodiv-datos">
            <div className="formulariodiv-datos-nombre">
              <label htmlFor="firstName">
                <span>*</span>Nombre(s):
              </label>
              <input
                type="text"
                id="firstName"
                className="input-nombre" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="formulariodiv-datos-apellido">
              <label htmlFor="lastName">
                <span>*</span>Apellido(s):
              </label>
              <input
                type="text"
                id="lastName"
                className="input-apellido" // Ejemplo de className
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="formulariodiv-datos-email">
              <label htmlFor="email">
                <span>*</span>Email:
              </label>
              <input
                type="email"
                id="email"
                className="input-email" // Ejemplo de className
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="formulariodiv-datos-telefono">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                className="input-telefono" // Ejemplo de className
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="formulariodiv-datos-mensaje">
              <label htmlFor="message">
                <span>*</span>Tu mensaje:
              </label>
              <textarea
                id="message"
                className="textarea-mensaje" // Ejemplo de className
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="formulariodiv-datos-enviar">
              <button type="submit">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}