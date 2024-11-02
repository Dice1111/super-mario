import React from "react";

const DeniedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Whoopsie Daisy!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Looks like you don't have permission to enter this page!
        </p>
      </div>
    </div>
  );
};

export default DeniedPage;
