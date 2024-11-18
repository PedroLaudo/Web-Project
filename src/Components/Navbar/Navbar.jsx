import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <a href="" className="logo">Audi</a>

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
