"use client";

import RatingAndReviewUI from "@/app/boundaries/UserUI/RatingAndReviewUI";
import { use } from "react";

interface Props {
  params: Promise<{ agentEmail: string }>;
}

const UsedCarDetailPage = ({ params }: Props) => {
  const unwrappedParams = use(params);
  const decodedEmail = decodeURIComponent(unwrappedParams.agentEmail);
  console.log(decodedEmail);
  const boundary = RatingAndReviewUI.getInstance();

  return <>{boundary.displayRatingAndReviewUI(decodedEmail)} </>;
};

export default UsedCarDetailPage;
