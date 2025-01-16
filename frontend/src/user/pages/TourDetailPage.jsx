import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../componets/Nav";
import Footer from "../componets/Footer"
import TourDetail from "../componets/TourDetail";

const TourDetailPage = () => {
  const { id } = useParams();  // Capture the destination id from the URL

  return (
    <>
     <Nav />
     <TourDetail destinationId={id}/>
     <Footer />
     
    </>
  );
};

export default TourDetailPage;
