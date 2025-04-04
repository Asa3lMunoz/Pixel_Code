import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormularioIngresarPage from './FormularioIngresarPage'
export default function Ingresar() {
  return (
    <>

      <div className='ingresarpage'>
       
        <FormularioIngresarPage/>
        <div className='footeringresarpage'>
          <Footer/>
      
        </div>
      </div>

    </>
  )
}
