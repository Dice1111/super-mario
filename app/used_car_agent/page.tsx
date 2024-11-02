import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome to the Used Car Listings!
        </h1>
        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default page;
