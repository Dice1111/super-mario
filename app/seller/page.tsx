"use client";

import React from "react";
import UserLogoutUI from "../boundaries/AdminUI/UserLogoutUI";

const page = () => {
  const boundary = UserLogoutUI.getInstance();
  return (
    <>
      <div>This is the seller page</div>;{boundary.displayLogoutUI()}
    </>
  );
};

export default page;
