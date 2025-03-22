import logo from '../img/logo.png'

export default function Footer() {
  return (

    <>

        <footer>
          <div className='footerlogo'>
            
            <img src={logo} alt="logo.png" />
            <p className='slogan2'>Diseño, publicidad y desarrollo de soluciones tecnológicas</p> 
            

          </div>
          
          <div className='footercontacto'>
            <h3>Contacto</h3>
            <p>contacto@pixelcode.cl</p>
            <p>+56 9 63731627</p>
            <p>+56 9 42795499</p>

          </div>
            
        </footer>



    </>

  )
}
