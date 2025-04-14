import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './views/IndexPage'
import FormularioSignup from './views/FormularioSignup'
import FormularioIngresarPage from './views/FormularioIngresarPage'
import FormularioForgot from './views/FormularioForgot'
import Contacto from './components/PagesApis/Contacto'
import UserProfile from './views/UserProfile'
import ProtectedRoute from '../src/components/ProtectedRoutes'


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
        <Route path='/' element={<IndexPage />} />

        <Route path='/Login' element={<FormularioIngresarPage />} />
        <Route path='/Signup' element={<FormularioSignup />} />
        <Route path='/LostPassword' element={<FormularioForgot />} />







        <Route path='/GodocuEditor' element={
          <ProtectedRoute allowedRoles={['superAdmin']}>
            <GodocuEditor />
          </ProtectedRoute>} />
        <Route path='/GodocuPage' element={
          <ProtectedRoute allowedRoles={['superAdmin']}>
            <GodocuPage />
          </ProtectedRoute>} />
        <Route path='/Contacto' element={
          <ProtectedRoute allowedRoles={['superAdmin']}>
            <ContactoPage />
          </ProtectedRoute>} />
        <Route path='/Clientes' element={
          <ProtectedRoute allowedRoles={['superAdmin']}>
            <Clientes />
          </ProtectedRoute>} />
        <Route path='/DocumentosPage' element={
          <ProtectedRoute allowedRoles={['superAdmin']}>
            <DocumentosPage />
          </ProtectedRoute>} />
        <Route path='/UsuariosPage' element={
          <ProtectedRoute allowedRoles={['superAdmin']}>
            <UsuariosPage />
          </ProtectedRoute>} />



        <Route path='/UserProfile' element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>} />


      </Routes>
    </BrowserRouter>

  )
}