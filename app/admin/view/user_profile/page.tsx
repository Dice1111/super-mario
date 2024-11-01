"use client";
import React, { Component } from "react";
import ViewUserProfileUI from "@/app/boundaries/AdminUI/ViewUserProfileUI";

const ViewUserProfilePage = () => {
  const viewUserProfileUI = ViewUserProfileUI.getInstance();

  return <>{viewUserProfileUI.displayUserProfileUI()} </>;
};

export default ViewUserProfilePage;
