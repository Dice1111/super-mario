"use client";
import SearchUI from "@/app/boundaries/AdminUI/SearchUI";
import { Component } from "react";

class SearchPage extends Component {
  render() {
    const boundary = SearchUI.getInstance();

    return <>{boundary.displaySearchUI()} </>;
  }
}

export default SearchPage;
