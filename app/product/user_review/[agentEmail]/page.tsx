"use client";
import CreateReviewAndRatingUI from "@/app/boundaries/UserUI/CreateReviewAndRatingUI";
import ViewRatingAndReviewUI from "@/app/boundaries/UserUI/ViewRatingAndReviewUI";
import { use } from "react";

interface Props {
  params: Promise<{ agentEmail: string }>;
}

const UsedCarDetailPage = ({ params }: Props) => {
  const unwrappedParams = use(params);
  const decodedEmail = decodeURIComponent(unwrappedParams.agentEmail);
  console.log(decodedEmail);
  const createReviewBoundary = CreateReviewAndRatingUI.getInstance();
  const viewReviewBoundary = ViewRatingAndReviewUI.getInstance();

  return (
    <>
      <h1 className="text-2xl font-bold">Review of {decodedEmail}</h1>
      <br />
      <br />
      {createReviewBoundary.displayCreateReviewAndRatingUI(decodedEmail)}
      {viewReviewBoundary.displayRatingAndReviewUI(decodedEmail)}
    </>
  );
};

export default UsedCarDetailPage;
