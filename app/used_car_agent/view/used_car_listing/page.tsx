"use client";

import ViewUsedCarListingUI from "@/app/boundaries/UsedCarAgentUI/ViewUsedCarListingUI";
import React from "react";

const ViewUsedCarListingPage = () => {
  const viewUsedCarListingsUIInstance = ViewUsedCarListingUI.getInstance();
  return <>{viewUsedCarListingsUIInstance.displayUsedCarListingUI()}</>;
};

export default ViewUsedCarListingPage;
