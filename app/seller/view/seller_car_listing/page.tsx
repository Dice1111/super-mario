"use client";

import ViewSellerCarListingUI from "@/app/boundaries/SellerUI/ViewSellerCarListingUI";
import React from "react";

const ViewUsedCarListingPage = () => {
  const boundary = ViewSellerCarListingUI.getInstance();
  return <>{boundary.displaySellerCarListingUI()}</>;
};

export default ViewUsedCarListingPage;
