import {Link, NavLink}  from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function FormularioIngresarPage() {
  return (
    <>
        <Header/>
        <div className="formularioingresarpagediv-global">
            
            <div className="formularioingresarpagediv">

                <form action="#">

                    <div className="formularioingresarpagediv-h2">
                        <h2>Ingresa a tu cuenta</h2>
                    </div>

                    <div className="formularioingresarpagediv-ingreso">

                        <div className="formularioingresarpagediv-ingreso-email">
                            <label htmlFor=""><span>*</span>Email:</label>
                            <input type="email"/>
                        </div>

                        <div className="formularioingresarpagediv-ingreso-contraseña">
                            <label htmlFor=""><span>*</span>Contraseña:</label>
                            <input type="password"/>
                        </div>

                    </div>
                    
                    <div className="formularioingresarpagediv-boton">
                        <button>Ingresar</button>
                    
                    </div>
                    <br />

                    <div className="formularioingresarpagediv-recuperar">
                        <p>Si aun no tienes tu cuenta, créala <span><Link to="/FormularioSignup">aquí</Link></span></p>
                        <p>Si olvidaste tu contraseña, recupérala <span><Link to="/FormularioForgot">aquí</Link></span></p>
                    </div>

                </form>

            </div>
            {/* <Footer/> */}
             
        </div>         
        
        



    </>
  )
}
