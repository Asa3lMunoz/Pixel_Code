import React from 'react'
import logo from '../img/logo.png'
function HeaderPanel() {
  return (
    <>
        <header>
            <div className='headerpaneldiv'>
                <img src={logo} alt="logo.png"/> 
            </div>
        </header>
    </>
  )
}

export default HeaderPanel
