"use client";

import Landing from "@/components/Landing/Landing";

const Page = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-12 bg-primary rounded-lg shadow-lg max-w-xl transform transition-transform hover:scale-105">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-white mb-8">
            🎉 Welcome to Your Admin Panel! 🎉
          </p>
          <p className="text-md text-white">
            Navigate your dashboard through a sidebar.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
