"use client";

import SearchBuyerShortlistUI from "@/app/boundaries/BuyerUI/SearchBuyerShortlistUI";
import ViewShortlistUI from "@/app/boundaries/BuyerUI/ViewShortlistUI";
import { useSession } from "next-auth/react";
import React from "react";

const ShortlistPage = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  // Check if session is loading
  if (status === "loading") {
    return <div>Loading...</div>; // You can replace this with a loading spinner if desired
  }

  // Ensure email is available before rendering the UI
  return (
    <div>
      {SearchBuyerShortlistUI.getInstance().displaySearchBuyerShortlistUI(
        email ?? ""
      )}
      {ViewShortlistUI.getInstance().displayViewShortlistUI(email ?? "")}
    </div>
  );
};

export default ShortlistPage;
