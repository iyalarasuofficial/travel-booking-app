import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './user/pages/HomePage';  // Your HomePage component
import { TourPage } from './user/pages/TourPage';
// Import other pages as needed
// import AboutPage from './user/pages/AboutPage';
// import TourPage from './user/pages/TourPage';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="tour" element={<TourPage/>}/>
        {/* Add other routes as needed */}
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/tour" element={<TourPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
