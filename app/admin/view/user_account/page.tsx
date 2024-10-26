"use client";
import React, { Component } from "react";
import ViewUserAccountUI from "@/app/boundaries/AdminUI/ViewUserAccountUI";

class ViewUserAccountPage extends Component {
  render() {
    const viewUserAccountUI = ViewUserAccountUI.getInstance();

    return <>{viewUserAccountUI.displayUserAccountUI()} </>;
  }
}

export default ViewUserAccountPage;
