

export default function Formulario() {
  return (

    <>

        <div className="formulariodiv">

            <form action="">

                <div className="formulariodiv-text">
                    <h2>Contacto</h2>
                    <p> Escuhamos tus propuestas e ideas por locas que sean!<br></br>Completa el formulario y te contactaremos lo antes posible</p>
                </div>

                <div className="formulariodiv-datos">

                    <div className="formulariodiv-datos-nombre">
                        <label htmlFor=""><span>*</span>Nombre(s):</label>
                        <input type="text"/>
                    </div>
                    <div className="formulariodiv-datos-apellido">
                        <label htmlFor=""><span>*</span>Apellido(s):</label>
                        <input type="text"/>
                    </div>
                    <div className="formulariodiv-datos-email">
                        <label htmlFor=""><span>*</span>Email:</label>
                        <input type="email"/>
                    </div>
                    <div className="formulariodiv-datos-telefono">
                        <label htmlFor="">Teléfono:</label>
                        <input type="tel" />
                    </div>
                    <div className="formulariodiv-datos-mensaje">
                        <label htmlFor=""><span>*</span>Tu mensaje:</label>
                        <textarea name="" id=""></textarea>
                    </div>
                    <div className="formulariodiv-datos-enviar">
                        <button>Enviar</button>
                    </div>

                </div>

            </form>
        </div>



    </>
  )
}
