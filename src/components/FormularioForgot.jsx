import {Link, NavLink}  from 'react-router-dom'

export default function FormularioForgot() {

  return (
    <>

        <div className="formularioingresarpagediv">

            <form action="">

                <div className="formularioingresarpagediv-h2">
                    <h2>Recupera tu contraseña</h2>
                    <p className="subtitulo">Ingresa tus email y recibirás un correo con instrucciones para recuperar tu cuenta</p>
                </div>

                <div className="formularioingresarpagediv-ingreso">

                    <div className="formularioingresarpagediv-ingreso-email">
                        <label htmlFor=""><span>*</span>Email:</label>
                        <input type="email"/>
                    </div>


                </div>
                
                <div className="formularioingresarpagediv-boton">
                    <button>Recuperar</button>
                </div>

                <div className="formularioingresarpagediv-recuperar">
                <p>Si aun no tienes tu cuenta, créala <span><Link to="/FormularioSignup">aqui</Link></span></p>
                <p>Si tienes una cuenta, ingresa <span><Link to="/FormularioIngresarPage">aqui</Link></span></p>
                </div>
            </form>

        </div>



    </>
  )
}