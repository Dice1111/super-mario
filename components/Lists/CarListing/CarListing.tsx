"use client";

import CreateShortlistUI from "@/app/boundaries/BuyerUI/CreateShortlistUI";
import Card from "@/components/Card/Card";
import AddToShotListModal from "@/components/Modal/AddToShortListModal";
import BuyerSearchBar from "@/components/Search/BuyerSearch/BuyerSearchBar";
import { SearchUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchUsedCarListingController";
import { UsedCarListing } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { set } from "zod";

interface ViewUsedCarListingProps {
  loadData: () => Promise<UsedCarListing[]>;
}

const CarListing = ({ loadData }: ViewUsedCarListingProps) => {
  const [cars, setCars] = useState<UsedCarListing[] | null>(null);
  const [car_id, setCarID] = useState<string>("");
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const fetchData = async () => {
    const data = await loadData();
    setCars(data);
    setModal(null);
  };

  useEffect(() => {
    // Load data on component mount

    fetchData();
  }, [loadData]);

  const search = async (title: string) => {
    const controller = SearchUsedCarListingController.getInstance();
    const result = await controller.searchUsedCarListingController(title);
    setCars(result);
  };

  useEffect(() => {
    if (car_id) {
      const createShortlistBoundary = CreateShortlistUI.getInstance();
      const modal = createShortlistBoundary.displayCreateShortlistUI(
        fetchData,
        car_id,
        userEmail ?? ""
      );
      setModal(modal);
    }
  }, [car_id]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <Card key={car.id} car={car} openModal={() => setCarID(car.id)} />
            ))}
          </div>
        ) : (
          <p>No cars available.</p>
        )}
      </div>
      {modal}
    </>
  );
};

export default CarListing;
