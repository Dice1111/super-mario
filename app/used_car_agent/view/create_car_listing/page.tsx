"use client";
import UserSignupUI from "@/app/boundaries/AdminUI/CreateUserAccountUI";
import CreateUsedCarListingUI from "@/app/boundaries/UsedCarAgentUI/CreateUsedCarListingUI";

import React from "react";

const CreateAccountPage = () => {
  const boundary = CreateUsedCarListingUI.getInstance();
  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center">
      {boundary.displayCreateUsedCarListingUI()}
    </div>
  );
};

export default CreateAccountPage;
