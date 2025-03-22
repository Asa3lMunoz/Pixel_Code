import {Link, NavLink}  from 'react-router-dom'
import logo from '../img/logo.png'


export default function Header() {
  return (
    <>

        <header>
          <div className='headerdiv'>

            <div className='headerdiv-logo'>
              <img src={logo} alt="logo.png"/>
            </div>

            <div className='headerdig-ingresar'>
              <Link to="/Ingresar"><i class="fa-solid fa-user"></i></Link>
            </div>

          </div>
        </header>




    </>
  )
}
