"use client";

import UsedCarAgentSearchUI from "@/app/boundaries/UsedCarAgentUI/UsedCarAgentSearchUI";

const SearchPage = () => {
  const boundary = UsedCarAgentSearchUI.getInstance();

  return <>{boundary.displayUsedCarAgentSearchUI()} </>;
};

export default SearchPage;
