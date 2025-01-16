import React from "react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Phillip Doe",
      role: "Marketing Director",
      image: "https://travelami.templaza.net/wp-content/uploads/2024/05/Our-Team-16-862x1024.jpg",
    },
    {
      name: "Jolie Charlot",
      role: "Marketing Director",
      image: "https://travelami.templaza.net/wp-content/uploads/2024/05/27-862x1024.jpg",
    },
    {
      name: "Anna Maria",
      role: "Director",
      image: "https://travelami.templaza.net/wp-content/uploads/2024/05/Our-Team-11-862x1024.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto  text-center bg-white-200 mb-5">
      <h2 className="text-4xl font-extrabold text-gray-800 mt-8">Our Experts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            className="bg-green-100 rounded-lg shadow-md p-4 transition-transform transform hover:-translate-y-2 hover:shadow-lg"
            key={index}
          >
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover transition-transform transform hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
