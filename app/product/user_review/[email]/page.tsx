"use client";

import React, { use } from "react";
import ViewRatingAndReviewUI from "@/app/boundaries/UserUI/ViewRatingAndReviewUI";

interface Props {
  params: Promise<{ email: string }>;
}

const UsedCarDetailPage = ({ params }: Props) => {
  const unwrappedParams = use(params);
  const boundary = ViewRatingAndReviewUI.getInstance();

  return <>{boundary.displayRatingAndReviewUI(unwrappedParams.email)} </>;
};

export default UsedCarDetailPage;
