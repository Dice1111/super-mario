"use client";

import ViewSellerUsedCarListingUI from "@/app/boundaries/SellerUI/ViewSellerUsedCarListingUI";

const ViewUsedCarListingPage = () => {
  const boundary = ViewSellerUsedCarListingUI.getInstance();
  return <>{boundary.displaySellerUsedCarListingUI()}</>;
};

export default ViewUsedCarListingPage;
