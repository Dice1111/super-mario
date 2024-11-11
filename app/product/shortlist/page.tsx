"use client";

import ViewShortlistUI from "@/app/boundaries/BuyerUI/ViewShortlistUI";

const ShortlistPage = () => {
  // Ensure email is available before rendering the UI
  return (
    <>
      <h1 className="text-2xl font-bold w-full text-center py-4">
        ShortList Cars
      </h1>
      {ViewShortlistUI.getInstance().displayViewShortlistUI()}
    </>
  );
};

export default ShortlistPage;
