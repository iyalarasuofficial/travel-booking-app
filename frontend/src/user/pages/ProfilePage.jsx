import React from 'react'
import UserProfile from '../componets/UserProfile'
import Breadcrumb from '../componets/BreadCrumb'
import Nav from '../componets/Nav'
import Footer from '../componets/Footer'

export const ProfilePage = () => {
  return (
   <>
   <Nav/>
   <Breadcrumb headings={"Profile"}/>
   <UserProfile/>
   <Footer/>
   </>
  )
}
