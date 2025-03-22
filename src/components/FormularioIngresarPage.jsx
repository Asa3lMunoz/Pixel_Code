

export default function FormularioIngresarPage() {
  return (
    <>

        <div className="formularioingresarpagediv">

            <form action="">

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

                <div className="formularioingresarpagediv-recuperar">
                    <p>Si aun no tienes tu cuenta, créala <span>aquí</span></p>
                    <p>Si olvidaste tu contraseña, recupérala <span>aquí</span></p>
                </div>
            </form>

        </div>



    </>
  )
}
