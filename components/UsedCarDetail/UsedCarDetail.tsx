"use client";

import React, { useState } from "react";
import Image from "next/image";
import car1 from "@/public/images/car1.jpeg";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

interface UsedCarDetailProps {
  id: string;
}

const UsedCarDetail = ({ id }: UsedCarDetailProps) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex flex-wrap gap-8 py-10 px-5 w-full justify-center bg-gray-100 container">
      <div className="relative overflow-hidden">
        <Image
          src={car1}
          alt="car1"
          className="object-cover shadow-lg rounded-lg"
          style={{ width: "350px", height: "250px" }}
        />
        <div
          onClick={toggleLike}
          className="absolute top-3 right-3 cursor-pointer text-red-500"
        >
          {liked ? (
            <FaHeart size={24} className="transition-all duration-200" />
          ) : (
            <FaRegHeart size={24} className="transition-all duration-200" />
          )}
        </div>
      </div>
      <div className="max-w-lg space-y-4 p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between">
          <h1 className="font-extrabold text-3xl text-gray-800">
            Futuristic Salon {id}
          </h1>
          <h2 className="text-gray-600 font-bold">1k views</h2>
        </div>
        <h2 className="font-bold text-xl text-green-500">$500,000</h2>
        <Link href={`/product/user_review/${id}`}>
          <p className="text-primary">agent@gmail.com</p>
        </Link>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          reprehenderit enim facilis placeat similique quis deleniti
          voluptatibus recusandae in vero, culpa possimus quidem minima itaque!
          Vitae eaque nemo veniam impedit.
        </p>
        <div>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Color:</span> Blue
            </li>
            <li>
              <span className="font-semibold">Type:</span> Sedan
            </li>
            <li>
              <span className="font-semibold">Mileage:</span> 15,000 km
            </li>
          </ul>
        </div>
        <br />
        <Button>Calculate Loan</Button>
      </div>
    </div>
  );
};

export default UsedCarDetail;
