import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <button className="logo-btn">
        <img src="/simbolo_audi-removebg-preview.png" alt="Audi" className="logo-img" />
      </button>
      

      <nav className="navbar">
        <a href="/">Página Inicial</a>
        <a href="/">Modelos</a>
        <a href="/">Usados</a>
        <a href="/">Inovação</a>
        <a href="/">Login</a>
      </nav>
    </header>
  )
}

export default Navbar
