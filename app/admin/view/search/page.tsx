"use client";

import SearchAdminUI from "@/app/boundaries/AdminUI/SearchAdminUI";

const SearchPage = () => {
  const boundary = SearchAdminUI.getInstance();

  return <>{boundary.displaySearchAdminUI()} </>;
};

export default SearchPage;
