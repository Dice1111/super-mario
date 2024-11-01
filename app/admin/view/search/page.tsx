"use client";
import SearchUI from "@/app/boundaries/AdminUI/SearchUI";
import { Component } from "react";

const SearchPage = () => {
  const boundary = SearchUI.getInstance();

  return <>{boundary.displaySearchUI()} </>;
};

export default SearchPage;
