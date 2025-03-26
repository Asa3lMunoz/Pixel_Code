import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormularioIngresarPage from '../components/FormularioIngresarPage'
export default function Ingresar() {
  return (
    <>

      <div className='ingresarpage'>
        <Header/>
        <FormularioIngresarPage/>
        <div className='footeringresarpage'>
          <Footer/>
        </div>

      </div>

    </>
  )
}
