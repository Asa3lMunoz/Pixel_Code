import logo from '../img/logo.png'
import whatsapp from "../img/iconos/whatsapp.png";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (

    <>

        <footer>
          <div className='footerlogo'>
            <Link to = "/">
            <img src={logo} alt="logo.png" />
            </Link>
            <p className='slogan2'>Diseño, publicidad y desarrollo de soluciones tecnológicas</p> 
            

          </div>
          
          <div className='footercontacto'>
            <h3>Contacto</h3>
            <p>by mikecrea.com</p>
            <p>proyectos@mikecrea.com</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={whatsapp} alt="WhatsApp" style={{ width: '20px', height: '20px' }} />+1 863 440 1417</p>

            

          </div>
            
        </footer>



    </>

  )
}
