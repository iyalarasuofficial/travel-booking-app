import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position='top-right' />
    
  </StrictMode>,
)
