import ViewUserAccountUI from "@/app/boundaries/ViewUserBoundary";
import React from "react";

const viewUserAccountUI = new ViewUserAccountUI();

const page = () => {
  return <div>{viewUserAccountUI.displayUserAccountsUI()}</div>;
};

export default page;
