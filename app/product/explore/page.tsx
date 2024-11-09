"use client";

import SearchBuyerUsedCarListingUI from "@/app/boundaries/UserUI/SearchBuyerUsedCarListingUI";

const ExploreProductPage = () => {
  const boundary = SearchBuyerUsedCarListingUI.getInstance();

  return <>{boundary.displaySearchBuyerUsedCarListingUI()}</>;
};

export default ExploreProductPage;
