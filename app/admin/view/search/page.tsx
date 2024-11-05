"use client";
import AdminSearchUI from "@/app/boundaries/AdminUI/AdminSearchUI";
const SearchPage = () => {
  const boundary = AdminSearchUI.getInstance();

  return <>{boundary.displayAdminSearchUI()} </>;
};

export default SearchPage;
