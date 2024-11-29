import React from "react";
import Nav from "./Nav";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <Nav />
      
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="//travelami.templaza.net/wp-content/uploads/2024/04/video.mp4" type="video/mp4"/>
       
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
        <h1 className="text-4xl font-extrabold text-white sm:text-3xl">
          A SLOW TOUR OF THE VALENCIA REGION 
            <strong className="block font-extrabold text-rose-500">
              Forever Home.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-lg">
          Greece is both epic and ethereal. This is a land of gods and goddesses after all, and our Greece tours all have smatterings of heavenliness built in. 
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
            <a
              href="#"
              className="block w-full mx-5 rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </a>

         
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
