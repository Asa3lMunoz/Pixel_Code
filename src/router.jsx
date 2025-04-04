import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexPage from './views/IndexPage'
import Ingresar from './views/IngresarPage'
import FormularioSignup from './views/FormularioSignup'
import FormularioIngresarPage from './views/FormularioIngresarPage'
import FormularioForgot from './views/FormularioForgot'
import Contacto from './views/Contacto'
import UserProfile from './views/UserProfile'



export default function AppRouter() {
  return (

    <BrowserRouter basename="/Pixel_Code">
        <Routes>
        <Route path='/' element={<IndexPage/>} />
          
            <Route path='/ingresar' element={<Ingresar/>} />
            <Route path='/FormularioSignup' element={<FormularioSignup/>} />
            <Route path='/FormularioIngresarPage' element={<FormularioIngresarPage/>} />
            <Route path='/FormularioForgot' element={<FormularioForgot/>} />
            <Route path='/Contacto' element={<Contacto/>} />
            <Route path= 'UserProfile' element={<UserProfile/>}/>
        </Routes>
    </BrowserRouter>

  )
}
