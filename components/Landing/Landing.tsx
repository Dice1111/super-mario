import React from "react";
import bgCar from "@/public/images/white-car.jpg";

const Landing = () => {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgCar.src})` }}
    >
      {/* Dark overlay behind text for better contrast */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      <p className="z-auto text-white text-2xl sm:text-4xl font-extrabold text-shadow-lg absolute p-6 ml-10 z-10">
        "Quality Cars, Great Prices"
      </p>
    </div>
  );
};

export default Landing;
