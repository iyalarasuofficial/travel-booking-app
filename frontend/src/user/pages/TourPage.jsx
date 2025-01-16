import React from 'react'
import Nav from '../componets/Nav'
import Footer from '../componets/Footer'
import TourCard from '../componets/TourCard'
import TourDetail from '../componets/TourDetail'
import Breadcrumb from '../componets/BreadCrumb'

 const TourPage = () => {
  return (
   <>
   <Nav/>
   <Breadcrumb headings={"Tour"}/>
   <TourCard/>
  <Footer/>
  
  

   </>
  )
}
export default TourPage;