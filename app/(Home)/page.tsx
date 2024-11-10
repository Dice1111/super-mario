"use client";
import ViewTopCarListingUI from "../boundaries/HomeUI/ViewTopCarListingUI";
import ViewUsedCarListingHomeUI from "../boundaries/HomeUI/ViewUsedCarListingHomeUI";

export default function Home() {
  const viewTopUsedCarListing = ViewTopCarListingUI.getInstance();
  const viewUsedCarListing = ViewUsedCarListingHomeUI.getInstance();

  return (
    <>
      <h1 className="text-2xl font-bold w-full text-center py-4">
        Most Popular
      </h1>
      {/* {viewTopUsedCarListing.displayViewTopCarListingUI()} */}
      <h1 className="text-2xl font-bold w-full text-center py-4">SHOP</h1>
      {viewUsedCarListing.displayViewUsedCarListingHomeUI()}
    </>
  );
}
