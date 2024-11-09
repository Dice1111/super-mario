"use client";

import UserLoginUI from "@/app/boundaries/UserUI/UserLoginUI";

const LoginPage = () => {
  const boundary = UserLoginUI.getInstance();

  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center">
      {boundary.displayLoginUI()}
    </div>
  );
};

export default LoginPage;
