"use client";

import UserLoginUI from "@/app/boundaries/UserUI/UserLoginUI";

const LoginPage = () => {
  const boundary = UserLoginUI.getInstance();

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col justify-center items-center">
      <div className="relative w-full max-w-4xl mx-auto px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 to-pink-500 opacity-50 blur-md"></div>

        {/* Main Content */}
        <div className="text-center text-white space-y-6">
          {/* Header */}
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            Welcome to Super Mario Car Website
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl font-medium text-gray-200">
            Log in to start exploring the best cars
          </p>

          {/* Login Form - Centered */}
          <div className=" bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto ">
            {boundary.displayLoginUI()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
