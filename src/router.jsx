import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexPage from './views/IndexPage'
import Ingresar from './views/IngresarPage'
import FormularioSignup from './views/FormularioSignup'
import FormularioIngresarPage from './views/FormularioIngresarPage'
import FormularioForgot from './views/FormularioForgot'
import Contacto from './components/PagesApis/Contacto'
import UserProfile from './views/UserProfile'

//PAGES PARA ADMINISTRACION
import GodocuEditor from './components/PagesApis/GodocuEditor'
import GodocuPage from './components/PagesApis/GodocuPage'
import ContactoPage from './components/PagesApis/ContactoPage'
import Clientes from './components/PagesApis/Clientes'
import DocumentosPage from './components/PagesApis/DocumentosPage'
import UsuariosPage from './components/PagesApis/UsuariosPage'

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
            <Route path= '/GodocuPage' element={<GodocuPage/>}/>
            <Route path= '/ContactoPage' element={<ContactoPage/>}/>
            <Route path= '/Clientes' element={<Clientes/>}/>
            <Route path= '/DocumentosPage' element={<DocumentosPage/>}/>
            <Route path= '/UsuariosPage' element={<UsuariosPage/>}/>

        </Routes>
    </BrowserRouter>

  )
}
