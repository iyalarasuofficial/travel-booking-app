import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './user/pages/HomePage';  // Your HomePage component
import TourPage from './user/pages/TourPage';   // TourPage component
import SignIn from './user/componets/auth/SignIn';  // SignIn component
import SignUp from './user/componets/auth/SignUp'; // SignUp component
import TourDetailPage from './user/pages/TourDetailPage';
import { AboutPage } from './user/pages/AboutPage';
import { BookedPage } from './user/pages/BookedPage';
import { ProfilePage } from './user/pages/ProfilePage';
import ForgotPassword from './user/componets/auth/ForgetPassword';
import ResetPassword from './user/componets/auth/ResetPassword';

// A PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  
  // Check for valid token; if not found or invalid, redirect to sign in
  if (!token) {
    return <Navigate to="/" />;
  }
  
  // Add further checks for token validity or expiration here if necessary
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes - Need authentication */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/tour" element={<PrivateRoute><TourPage /></PrivateRoute>} />
        <Route path="/destination/:id" element={<PrivateRoute><TourDetailPage /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><BookedPage /></PrivateRoute>} />
        <Route path="/my_profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
