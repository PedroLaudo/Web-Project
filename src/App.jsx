import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/Login';
import Modelos from './Components/Modelos/Modelos';
import Usados from './Components/Usados/Usados';
import Inovacao from './Components/Inovacao/Inovacao';
import Inicial from './Components/Inicial/Inicial';
import Back_Office from './Components/Back Oficce/Back_office';



const App = () => {
  return (
    <><Router>
      
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/modelos" element={<Modelos />} />
        <Route path="/usados" element={<Usados />} />
        <Route path="/inovacao" element={<Inovacao />} />
        <Route path="/inicial" element={<Inicial />} />
        <Route path="/back_office" element={<Back_Office />} />
      </Routes>
    </Router></>

  );
};

export default App