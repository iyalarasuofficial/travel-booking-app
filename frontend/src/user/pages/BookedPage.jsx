import React from 'react'
import Nav from '../componets/Nav'
import Bhistory from '../componets/Bhistory'
import Breadcrumb from '../componets/BreadCrumb'
import Footer from '../componets/Footer'

export const BookedPage = () => {
  return (
    <>
    <Nav/>
    <Breadcrumb headings={"bookings"}/>
    <Bhistory/>
    <Footer/>
    </>
  )
}
