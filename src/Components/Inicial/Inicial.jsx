// src/Components/Inicial/Inicial.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Inicial.css';

const Inicial = () => {
  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <img 
          src="public/foto_pagina_inicial.jpg" 
          alt="Carro em destaque" 
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Bem-vindo à CarBrand</h1>
          <p>Descubra o futuro da mobilidade com nossos veículos de luxo.</p>
          <a href="/modelos">
            <button className="cta-button">Explore os Modelos</button>
          </a>
        </div>
      </section>

      <section className="featured-cars">
        <h2>Nossos Destaques</h2>
        <div className="car-gallery">
          <div className="carro-item">
            <img src="public/audi a3 Sportback verde.png" alt="Audi A3 Sportback" />
            <h3>Audi A3 Sportback</h3>
          </div>
          <div className="car-item">
            <img src="public/audi a3 Sedan 2024.png" alt="Audi A3 Sedan 2024" />
            <h3>Audi A3 Sedan 2024</h3>
          </div>
          <div className="car-item">
            <img src="/images/car3.jpg" alt="Modelo 3" />
            <h3>Modelo 3</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicial;
