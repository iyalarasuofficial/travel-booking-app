import React from 'react'
import { MaterialTailwindProvider } from '@material-tailwind/react';
import Nav from '../componets/Nav';
import Footer from '../componets/Footer';
import HeroSection from '../componets/HeroSection';
import TravelCard from '../componets/TravelCard';
import TeamSection from '../componets/TeamSection';
import AboutSection from '../componets/AboutSection';
import Bhistory from '../componets/Bhistory';


 const HomePage = () => {
  return (
   <div>
    <HeroSection/>
    <TravelCard/>
    <AboutSection/>
    <TeamSection/>
    <Footer/>
   </div>
  )
}

export default HomePage