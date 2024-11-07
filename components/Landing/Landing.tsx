import React from "react";
import bgCar from "@/public/images/white-car.jpg";
const Landing = () => {
  return (
    <div
      className=" relative bg-red-500 h-screen w-w-full flex items-start justify-start -ml-4"
      style={{
        backgroundImage: `url(${bgCar.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p
        className="font-sans  text-zinc-800   font-extrabold ...  absolute p-4 pl-6  "
        style={{
          fontSize: "150%",

          top: "28%",
          left: "13%",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Quality You Can Trust
      </p>
    </div>
  );
};

export default Landing;
