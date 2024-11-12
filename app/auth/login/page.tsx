"use client";

import UserLoginUI from "@/app/boundaries/UserUI/UserLoginUI";
import LoginCar from "@/public/images/login_car.jpg";

const LoginPage = () => {
  const boundary = UserLoginUI.getInstance();

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${LoginCar.src})` }}
    >
      {/* Overlay for darkening the background (optional) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered login UI */}
      <div className="relative z-10 flex items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
        {boundary.displayLoginUI()}
      </div>
    </div>
  );
};

export default LoginPage;
