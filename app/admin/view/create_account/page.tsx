"use client";
import UserSignupUI from "@/app/boundaries/AdminUI/CreateUserAccountUI";

import React from "react";

const CreateAccountPage = () => {
  const boundary = UserSignupUI.getInstance();
  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center">
      {boundary.displayCreateUserAccountUI()}
    </div>
  );
};

export default CreateAccountPage;
