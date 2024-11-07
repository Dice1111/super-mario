"use client";
import ViewUsedCarListingHomeUI from "../boundaries/HomeUI/ViewUsedCarListingHomeUI";

export default async function Home() {
  const viewUsedCarListing = ViewUsedCarListingHomeUI.getInstance();

  return <>{viewUsedCarListing.displayUsedCarListingHomeUI()}</>;
}
