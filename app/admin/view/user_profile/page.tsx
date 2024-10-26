"use client";
import React, { Component } from "react";
import ViewUserProfileUI from "@/app/boundaries/AdminUI/ViewUserProfileUI";

class ViewUserProfilePage extends Component {
  render() {
    const viewUserProfileUI = ViewUserProfileUI.getInstance();

    return <>{viewUserProfileUI.displayUserProfileUI()} </>;
  }
}

export default ViewUserProfilePage;
