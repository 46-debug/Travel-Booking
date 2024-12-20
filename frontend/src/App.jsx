import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Admin from './Admin';
import Details from './Details';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;