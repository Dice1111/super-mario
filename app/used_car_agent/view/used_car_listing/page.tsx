"use client";

import ViewAgentUsedCarListingUI from "@/app/boundaries/UsedCarAgentUI/ViewAgentUsedCarListingUI";

import React from "react";

const ViewUsedCarListingPage = () => {
  const viewUsedCarListingsUIInstance = ViewAgentUsedCarListingUI.getInstance();
  return <>{viewUsedCarListingsUIInstance.displayAgentUsedCarListingUI()}</>;
};

export default ViewUsedCarListingPage;
