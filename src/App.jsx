import React from 'react';
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/Login';
import Modelos from './Components/Modelos/Modelos';
import Usados from './Components/Usados/Usados';
import Inovacao from './Components/Inovacao/Inovacao';
import Inicial from './Components/Inicial/Inicial';



const App = () => {
  return (
    <><Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/modelos" element={<Modelos />} />
        <Route path="/usados" element={<Usados />} />
        <Route path="/inovacao" element={<Inovacao />} />
        <Route path="/inicial" element={<Inicial />} />
      </Routes>
    </Router></>

  );
};

export default App