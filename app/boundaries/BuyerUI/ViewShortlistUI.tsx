import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewShortlistController } from "@/controls/ShortlistControllers/ViewShortlistController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";
import SearchBuyerShortlistUI from "./SearchBuyerShortlistUI";
import React, { useState } from "react";

class ViewShortlistUI {
  private static instance: ViewShortlistUI;

  private constructor() {}

  public static getInstance(): ViewShortlistUI {
    if (!ViewShortlistUI.instance) {
      ViewShortlistUI.instance = new ViewShortlistUI();
    }
    return ViewShortlistUI.instance;
  }

  // Update here: id is now a string parameter
  public displayViewShortlistUI = (): JSX.Element => {
    const [showData, setShowData] = useState<UsedCarListing[] | null>(null);

    const loadData = async (): Promise<UsedCarListing[]> => {
      if (showData) return showData;
      const viewShortlistController = ViewShortlistController.getInstance();
      try {
        const shortlists =
          await viewShortlistController.viewShortlistController();
        if (shortlists.length > 0) {
          this.displaySuccessUI();
          return shortlists;
        } else {
          this.displayErrorUI();
          return [];
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    return (
      <>
        {SearchBuyerShortlistUI.getInstance().displaySearchBuyerShortlistUI(
          setShowData
        )}
        <CarListing loadData={loadData} />
      </>
    );
  };

  public displaySuccessUI() {
    toast.success("Shortlist Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Shortlist Data Retrieval Failed", errorToast);
  }
}

export default ViewShortlistUI;
