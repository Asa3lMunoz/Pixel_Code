import {Link, NavLink}  from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function FormularioForgot() {

  return (
    <>
        <Header/>
        <div class="formulario-container">
            <div class="FormularioForget-container">
                <form action="#">
                    <div class="FormularioForget-h2">
                        <h3>Recupera tu contraseña</h3>
                        <p class="FormularioForget-subtitulo">Ingresa tu email y recibirás un correo con instrucciones para recuperar tu cuenta.</p>
                    </div>
                    <div class="FormularioForget-ingreso">
                        <div class="FormularioForget-ingreso-email">
                            <label for="email">Email:</label>
                            <input placeholder="Email" type="email"/>
                        </div>
                    </div>
                    <div class="FormularioForget-boton">
                        <button type="submit">Recuperar</button>
                    </div>
                    <div class="FormularioForget-recuperar">
                        <p>Si aun no tienes tu cuenta, créala <span><Link to="/Signup">aqui</Link></span></p>
                        <p>Si tienes una cuenta, ingresa <span><Link to="/Login">aqui</Link></span></p>
                    </div>


                </form>
            </div>
               
        </div>
        <Footer/>

    
  
      


    </>
  )
}