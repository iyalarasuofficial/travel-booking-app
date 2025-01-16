import React from 'react'

const GalleryCard = ({ destinationDetails }) => {
  return (
    <section>
      <h2 className="text-4xl font-extrabold text-black-700 mb-4">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {destinationDetails.images?.map((image, index) => (
          <div key={index} className="w-full h-auto">
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default GalleryCard;
