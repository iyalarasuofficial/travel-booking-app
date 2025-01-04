import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './user/pages/HomePage';  // Your HomePage component
import TourPage from './user/pages/TourPage';   // TourPage component
import SignIn from './user/componets/auth/SignIn';  // SignIn component
import SignUp from './user/componets/auth/SignUp'; // SignUp component

// A PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/tour" element={<PrivateRoute><TourPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
