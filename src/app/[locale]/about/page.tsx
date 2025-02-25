import React from "react";
import Header from "@/components/store/layout/header/header";
const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans p-8 w-full min-h-screen">
      <Header />
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="images-container w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <img
              key={index}
              src={`/assets/images/about_page-${(index + 1)
                .toString()
                .padStart(4, "0")}.jpg`}
              alt={`About Page ${index + 1}`}
              className="about-image w-full h-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
