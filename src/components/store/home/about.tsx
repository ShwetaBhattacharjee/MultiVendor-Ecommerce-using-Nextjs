import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans p-8 about-us-container">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="images-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <img
              key={index}
              src={`/assets/images/about_page-${(index + 1)
                .toString()
                .padStart(4, "0")}.jpg`}
              alt={`About Page ${index + 1}`}
              className="about-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
