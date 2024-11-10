"use client";

import SearchAdminUI from "@/app/boundaries/AdminUI/SearchAdminUI";

const SearchPage = () => {
  const boundary = SearchAdminUI.getInstance(); // Getting the singleton instance

  // Call the method from the instance
  return <>{boundary.displaySearchAdminUI()}</>; // This should work now
};

export default SearchPage;
