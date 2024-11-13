"use client";

import { AddNumberOfViewController } from "@/controls/ViewControllers/AddNumberOfViewController";
import { UsedCarListing } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaHeart, FaRegHeart, FaUser } from "react-icons/fa";
import { Button } from "../ui/button";
import { ViewShortlistController } from "@/controls/ShortlistControllers/ViewShortlistController";

interface CardProps {
  car: UsedCarListing;
  setCarID: () => void;
  setOpenModal: () => void;
}

const Card = ({ car, setCarID, setOpenModal }: CardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();
  const controller = ViewShortlistController.getInstance();
  const fetchFavoriteStatus = async () => {
    const exists = await controller.checkCarInShortListController(car.id);
    setIsFavorited(exists);
  };
  useEffect(() => {
    fetchFavoriteStatus();
  }, []);

  const handleFavoriteClick = () => {
    setCarID();
    setOpenModal();
    setIsFavorited(!isFavorited); // Toggle favorite state after modal opens
  };

  const handleShowDetails = async () => {
    car.viewCount++;
    const carData = encodeURIComponent(JSON.stringify(car));
    const viewController = AddNumberOfViewController.getInstance();
    await viewController.addNumberOfViewController(car.id);

    router.push(`/product/used_car_detail/${car.id}?carData=${carData}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      {/* Image with Favorite Icon */}
      <div className="relative">
        <CldImage
          src={car.imgUrl}
          alt="Preview"
          width={1000}
          height={1000}
          className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105 rounded-t-lg"
        />

        {/* Heart icon for favoriting */}
        <div
          className="absolute top-4 right-4 text-2xl cursor-pointer text-white"
          onClick={handleFavoriteClick}
        >
          {isFavorited ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-300 hover:text-red-500 transition duration-200" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {car.title}
        </h2>

        <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
          ${car.price.toLocaleString()}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {car.manufacturedYear} • {car.mileage.toLocaleString()} miles •{" "}
          {car.color}
        </p>

        {/* Agent Info */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
          <FaUser className="text-xl" />
          <p className="text-sm">{car.agentEmail}</p>
        </div>

        {/* View Count */}
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
          <FaEye className="mr-1" />
          <span>{car.viewCount} views</span>
        </div>

        {/* Show Details Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleShowDetails}
            className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Show Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
