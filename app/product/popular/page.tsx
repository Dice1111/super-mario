"use client";

import ViewTopCarListingUI from "@/app/boundaries/HomeUI/ViewTopCarListingUI";

export default function popularPage() {
  const viewTopUsedCarListing = ViewTopCarListingUI.getInstance();

  return (
    <>
      <h1 className="text-2xl font-bold w-full text-center py-4">
        Most Popular
      </h1>
      {viewTopUsedCarListing.displayViewTopCarListingUI()}
    </>
  );
}
