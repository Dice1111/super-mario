"use client";

import ViewUsedCarListingHomeUI from "../boundaries/HomeUI/ViewUsedCarListingHomeUI";

export default function Home() {
  const viewUsedCarListing = ViewUsedCarListingHomeUI.getInstance();

  return (
    <>
      {/* {viewTopUsedCarListing.displayViewTopCarListingUI()} */}
      <h1 className="text-2xl font-bold w-full text-center py-4">SHOP</h1>
      {viewUsedCarListing.displayViewUsedCarListingHomeUI()}
    </>
  );
}
