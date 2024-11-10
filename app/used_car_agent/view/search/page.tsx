"use client";

import SearchAgentUsedCarListingUI from "@/app/boundaries/UsedCarAgentUI/SearchAgentUsedCarListingUI";

const SearchPage = () => {
  const boundary = SearchAgentUsedCarListingUI.getInstance();

  return <>{boundary.displaySearchAgentUsedCarListingUI()} </>;
};

export default SearchPage;
