"use client";

import CreateUserProfileUI from "@/app/boundaries/AdminUI/CreateUserProfileUI";
import React from "react";

const CreateProfilePage = () => {
  const createUserProfilePage = CreateUserProfileUI.getInstance();
  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center">
      {createUserProfilePage.displayCreateUserProfileUI()}
    </div>
  );
};

export default CreateProfilePage;
