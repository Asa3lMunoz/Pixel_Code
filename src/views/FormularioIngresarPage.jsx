import { Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import axios from 'axios';
import Footer from "../components/Footer";

function FormularioIngresarPage() {
    const [Email, SetEmail] = useState("");
    const [pass, SetPass] = useState("");
    const navigate = useNavigate();

    /* Datos del usuario para mostrar*/
    const [nombre, SetNombre] = useState("");
    const [apellido, SetApellido] = useState("");
    const [roles, setroll] = useState("");

    const consultarApi = async (e) => {
        e.preventDefault();

        try {
            const respAPi = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: Email,
                    password: pass
                }),
            });
            if (respAPi.ok) {
                SetEmail("");
                SetPass("");
                const datosApi = await respAPi.json();

                if (datosApi.success == true) {
                    const datosU = datosApi.user;
                    const rolesU = datosApi.user.roles;
                    let assignedRole = "Cliente"; // Rol por defecto

                    console.log("Usuario logeado correctamente")
                    console.log("Nombre :", datosU.firstName)
                    console.log("Apellido ", datosU.lastName)

                    SetNombre(datosU.firstName);
                    SetApellido(datosU.lastName);

                    rolesU.forEach(rol => {
                        if (rol === "superAdmin") { 
                            assignedRole = "superAdmin"; 
                        }      
                    });

                    setroll(assignedRole);

                    localStorage.setItem('user', JSON.stringify({
                        nombre: datosU.firstName,
                        apellido: datosU.lastName,
                        rol: assignedRole,
                    }));

                    navigate('/');

                } else {
                    console.log(datosApi.error)
                    alert(datosApi.error, " Volver a ingresar el email o contrasena")
                }
            } else {
                console.log("Se ha encontrado un error", respAPi.status);
            }
        } catch (error) {
            console.log("Hubo un error:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="formulario-container">
                <div className="formularioingresarpagediv">
                    <form onSubmit={consultarApi}>
                        <div className="formularioingresarpagediv-h2">
                            <h2>Ingresa a tu cuenta</h2>
                        </div>
                        <div className="formularioingresarpagediv-ingreso">
                            <div className="formularioingresarpagediv-ingreso-email">
                                <label htmlFor=""><span>*</span>Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={Email}
                                    onChange={(e) => SetEmail(e.target.value)} />
                            </div>
                            <div className="formularioingresarpagediv-ingreso-contraseña">
                                <label htmlFor="" ><span>*</span>Contraseña:</label>
                                <input type="password"
                                    id='pass'
                                    value={pass}
                                    onChange={(e) => SetPass(e.target.value)} />
                            </div>
                        </div>
                        <div className="formularioingresarpagediv-boton">
                            <button>Ingresar</button>
                        </div>
                        <br />
                        <div className="formularioingresarpagediv-recuperar">
                            <p>Si aun no tienes tu cuenta, créala <span><Link to="/Signup">aquí</Link></span></p>
                            <p>Si olvidaste tu contraseña, recupérala <span><Link to="/LostPassword">aquí</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default FormularioIngresarPage;