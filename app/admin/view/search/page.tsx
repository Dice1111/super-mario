"use client";

import SearchAdminUI from "@/app/boundaries/AdminUI/SearchAdminUI";

const SearchPage = () => {
  const boundary = SearchAdminUI.getInstance();

  // Call the method from the instance
  return <>{boundary.displaySearchAdminUI()}</>;
};

export default SearchPage;
