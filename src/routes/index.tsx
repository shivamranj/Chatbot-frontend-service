import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreApp from '../components/PreApp';

const Routings: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreApp />} />
      </Routes>
    </Router>
  );
}

export default Routings;
