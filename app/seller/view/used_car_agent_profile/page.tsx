"use client";

import ViewUsedCarAgentProfileUI from "@/app/boundaries/SellerUI/ViewUsedCarAgentProfileUI";

const ViewUsedCarAgentListingPage = () => {
  const boundary = ViewUsedCarAgentProfileUI.getInstance();
  return <>{boundary.displayUsedCarAgentProfileUI()}</>;
};

export default ViewUsedCarAgentListingPage;
