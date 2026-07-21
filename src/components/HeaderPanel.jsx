import React from 'react'
import logo from '../img/logo.png'

function HeaderPanel() {
  return (
    <header className="adm-topbar">
      <div className="adm-topbar-logo">
        <img src={logo} alt="logo" />
      </div>
    </header>
  )
}

export default HeaderPanel
