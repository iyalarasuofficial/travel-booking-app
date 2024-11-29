import React, { useState, useEffect } from 'react';

const AboutSection= () => {
  const counters = [
    { title: "Happy Traveller", value: 50, suffix: "k+" },
    { title: "Tent Sites", value: 32, suffix: "k" },
    { title: "Satisfaction Rate", value: 100, suffix: "%" },
    { title: "Year Of Service", value: 17, suffix: "+" }
  ];

  const [counterValues, setCounterValues] = useState(counters.map(counter => ({ value: 0 })));

  useEffect(() => {
    counters.forEach((counter, index) => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.floor(counter.value / 100);
        if (count >= counter.value) {
          clearInterval(interval);
          count = counter.value;
        }
        setCounterValues(prevState => {
          const newValues = [...prevState];
          newValues[index] = { value: count };
          return newValues;
        });
      }, 50);
    });
  }, []);

  return (
    <div className="bg-white py-12 px-6 md:px-12">
      {/* About Travelami Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About Travelami</h2>
        <p className="text-xl text-gray-600 ">
          World Best Travel Agency Company Since 2006. In the beginning, this walking holiday will take you through
          the imposing Anidri Gorge and then the Irini Gorge, full of flowering oleander bushes, up to the scenic
          plateau of Omalos. The next highlight is walking down the world-famous Samaria Gorge to the seashore after
          which you head further east along the coast to the most romantic village on Crete: the idyllic Loutro, accessible
          only by boat or on foot.
        </p>
      </div>

      {/* Counter Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
        {counterValues.map((counter, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">{counters[index].title}</div>
            <div className="text-4xl font-bold text-blue-600">
              {counter.value.toLocaleString()}
              <span className="text-gray-500 text-2xl">{counters[index].suffix}</span>
            </div>
          </div>
        ))}
      </div>

  
      <div className="text-center mt-12">
        <a href="https://travelami.templaza.net/about-us/" className="bg-pink-600 text-white text-lg px-7 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Discover More
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
