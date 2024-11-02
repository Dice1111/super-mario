"use client";

import ViewRatingAndReviewUI from "@/app/boundaries/UsedCarAgentUI/ViewRatingAndReviewListUI";
import React from "react";

const ViewReviewAndRatingPage = () => {
  const viewUsedCarListingsUIInstance = ViewRatingAndReviewUI.getInstance();
  return <>{viewUsedCarListingsUIInstance.displayReviewAndRatingUI()}</>;
};

export default ViewReviewAndRatingPage;
