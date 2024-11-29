import React from "react";
import "uikit/dist/css/uikit.min.css"; // Include the UIkit styles
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons); // Initialize the UIkit icons;
import "../styles/TeamSection.css"; 
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
        <div className="team-container">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 mx-auto text-center">Our Experts</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default TeamSection;
