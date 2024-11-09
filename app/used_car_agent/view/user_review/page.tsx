"use client";

import ViewRatingAndReviewUI from "@/app/boundaries/UserUI/ViewRatingAndReviewUI";
import { useSession } from "next-auth/react";
import React from "react";

const ViewReviewAndRatingPage = () => {
  const { data: session } = useSession();
  const agentEmail = session?.user.email ?? "";
  const viewUsedCarListingsUIInstance = ViewRatingAndReviewUI.getInstance();
  return (
    <>{viewUsedCarListingsUIInstance.displayRatingAndReviewUI(agentEmail)}</>
  );
};

export default ViewReviewAndRatingPage;
