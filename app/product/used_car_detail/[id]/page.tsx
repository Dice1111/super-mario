"use client";

import ViewUsedCarDetailUI from "@/app/boundaries/UserUI/ViewUsedCarDetailUI";
import { UsedCarListing } from "@prisma/client";
import { useSearchParams } from "next/navigation";

const UsedCarDetailPage = () => {
  const searchParams = useSearchParams();
  const carData = searchParams.get("carData");

  // Parse the car data if it exists
  const car: UsedCarListing | null = carData
    ? JSON.parse(decodeURIComponent(carData))
    : null;

  if (!car) {
    return <p>Car details not available.</p>;
  }

  return <>{ViewUsedCarDetailUI.getInstance().displayUsedCarDetailUI(car)}</>;
};

export default UsedCarDetailPage;
