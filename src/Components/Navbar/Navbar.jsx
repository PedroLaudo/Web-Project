import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
      <header className="header">
        <button className="logo-btn">
          <img src="/simbolo_audi-removebg-preview.png" alt="Audi" className="logo-img" />
        </button>

        <nav className="navbar">
          <a href="/inicial">Página Inicial</a>
          <a href="/modelos">Modelos</a>
          <a href="/usados">Usados</a>
          <a href="/inovacao">Inovação</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      
    </>
  )
}

export default Navbar
