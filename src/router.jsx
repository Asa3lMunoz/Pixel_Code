import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexPage from './views/IndexPage'
import Ingresar from './views/IngresarPage'
import FormularioSignup from './views/FormularioSignup'
import FormularioIngresarPage from './views/FormularioIngresarPage'
import FormularioForgot from './views/FormularioForgot'
import Contacto from './views/Contacto'
import UserProfile from './views/UserProfile'

//PAGES PARA ADMINISTRACION
import GodocuEditor from './views/GodocuEditor'
import GodocuPage1 from './views/Godocupage1'
import ContactoRecep from './views/ContactoRecep'
import Clientes from './views/Clientes'
import Documentos from './views/Documentos'
import Usuarios from './views/Usuarios'

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
            
            <Route path= '/GodocuEditor' element={<GodocuEditor/>}/>
            <Route path= '/GodocuPage1' element={<GodocuPage1/>}/>
            <Route path= '/ContactoRecep' element={<ContactoRecep/>}/>
            <Route path= '/Clientes' element={<Clientes/>}/>
            <Route path= '/Documentos' element={<Documentos/>}/>
            <Route path= '/Usuarios' element={<Usuarios/>}/>

        </Routes>
    </BrowserRouter>

  )
}
