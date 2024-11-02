"use client";

import React from "react";
import UserLogoutUI from "../boundaries/AdminUI/UserLogoutUI";

const page = () => {
  const boundary = UserLogoutUI.getInstance();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome to the Used Car Listings!
        </h1>
        {boundary.displayLogoutUI()}
      </div>
    </div>
  );
};

export default page;
