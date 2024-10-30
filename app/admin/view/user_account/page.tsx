"use client";
import ViewUserAccountUI from "@/app/boundaries/AdminUI/ViewUserAccountUI";
import React, { Component } from "react";

class ViewUserAccountPage extends Component {
  render() {
    const viewUserAccountUI = ViewUserAccountUI.getInstance();

    return <>{viewUserAccountUI.displayUserAccountUI()} </>;
  }
}

export default ViewUserAccountPage;
