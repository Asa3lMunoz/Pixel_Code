import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexPage from './views/IndexPage'
import Ingresar from './views/IngresarPage'
import FormularioSignup from './components/FormularioSignup'
import FormularioIngresarPage from './components/FormularioIngresarPage'
import FormularioForgot from './components/FormularioForgot'
import Contacto from './components/Contacto'
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
        </Routes>
    </BrowserRouter>

  )
}
