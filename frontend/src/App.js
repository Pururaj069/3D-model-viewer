import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Viewer from './pages/Viewer/Viewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewer/:modelId" element={<Viewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;