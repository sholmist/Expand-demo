import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
import Detailpage from './pages/DetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/detail" element={<Detailpage />} />
      </Routes>

    </>
  );
}

export default App;