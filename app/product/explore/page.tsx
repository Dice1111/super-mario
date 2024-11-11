"use client";

import SearchBuyerUsedCarListingUI from "@/app/boundaries/BuyerUI/SearchBuyerUsedCarListingUI";

const ExploreProductPage = () => {
  const boundary = SearchBuyerUsedCarListingUI.getInstance();

  return (
    <>
      <h1 className="text-2xl font-bold w-full text-center py-4">Explore</h1>
      {boundary.displaySearchBuyerUsedCarListingUI()}
    </>
  );
};

export default ExploreProductPage;
