import React from 'react'

export const TourHeroSection = ({destinationDetails}) => {
  return (
   <section
         className="relative h-72 sm:h-60 md:h-72 lg:mx-5 bg-cover bg-center lg:rounded-3xl   "
         style={{ backgroundImage: `url(${destinationDetails.images[0]})` }}
       >
         {/* Overlay */}
         <div className="absolute inset-0 bg-black bg-opacity-50 lg:rounded-3xl pointer-events-none"></div>
   
         {/* Content */}
         <div className="relative z-5 h-full flex flex-col justify-center items-center text-white text-center px-4 sm:px-2">
           {/* Breadcrumb */}
         
   
           {/* Heading */}
           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ">{destinationDetails.name}</h1>
         </div>
       </section>
  )
}
