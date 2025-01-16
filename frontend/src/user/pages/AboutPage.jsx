import React from 'react'
import Nav from '../componets/Nav'
import Breadcrumb from '../componets/BreadCrumb'
import AboutSection from "../componets/AboutSection"
import Footer from '../componets/Footer'
import TeamSection from "../componets/TeamSection"
import TravelCard from "../componets/TravelCard"

export const AboutPage = () => {
  return (
    <>
    <Nav/>
    <Breadcrumb headings={"About"}/>
    <AboutSection/>
    <TeamSection/>
    <TravelCard/>
    <Footer/>
    </>
  )
}
