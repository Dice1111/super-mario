"use client";

import Card from "@/components/Card/Card";
import { UsedCarListing } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface ViewUsedCarListingProps {
  loadData: () => Promise<UsedCarListing[]>;
}

const CarListing = ({ loadData }: ViewUsedCarListingProps) => {
  const [cars, setCars] = useState<UsedCarListing[]>([]);

  useEffect(() => {
    // Load data on component mount
    const fetchData = async () => {
      const data = await loadData();
      setCars(data);
    };
    fetchData();
  }, [loadData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarListing;
