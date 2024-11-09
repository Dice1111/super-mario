"use client";
import ViewUsedCarListingHomeUI from "../boundaries/HomeUI/ViewUsedCarListingHomeUI";

export default function Home() {
  const viewUsedCarListing = ViewUsedCarListingHomeUI.getInstance();

  return <>{viewUsedCarListing.displayUsedCarListingHomeUI()}</>;
}
