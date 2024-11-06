"use client";
import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaUser } from "react-icons/fa";
import { Button } from "../ui/button";

const Card = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited); // Toggle between filled and outlined heart
  };

  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <img
          className="p-6 rounded-t-lg w-full h-60 object-cover"
          src="/images/BMW.jpg"
          alt="product image"
        />

        {/* Favorite icon */}
        <div
          className="absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={handleFavoriteClick}
        >
          {isFavorited ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-300 hover:text-red-500 transition duration-200" />
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="px-6 pb-6 pt-4 bg-gray-100 rounded-b-lg dark:bg-gray-900">
        {/* Title */}
        <h5 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Honda Civic (EG6) Spoon Version Yellow 1991
        </h5>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 dark:text-gray-300 mb-4">
          $599
        </p>

        {/* Agent info */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
          <FaUser className="text-xl" />
          <p className="text-sm">agent@gmail.com</p>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <Button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-red-950 transition duration-200">
            Show details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
