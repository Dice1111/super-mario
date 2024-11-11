import CarListing from "@/components/Lists/CarListing/CarListing";
import BuyerSearchBar from "@/components/Search/BuyerSearch/BuyerSearchBar";
import { BuyerSearchSchemaType } from "@/components/Search/BuyerSearch/BuyerSearchSchema";
import { SearchBuyerShortlistController } from "@/controls/ShortlistControllers/SearchBuyerShortlistController";

import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

class SearchBuyerShortlistUI {
  private static instance: SearchBuyerShortlistUI;

  private constructor() {}

  public static getInstance(): SearchBuyerShortlistUI {
    if (!SearchBuyerShortlistUI.instance) {
      SearchBuyerShortlistUI.instance = new SearchBuyerShortlistUI();
    }
    return SearchBuyerShortlistUI.instance;
  }

  public displaySearchBuyerShortlistUI = (
    email?: string,
    setShowData?: (data: UsedCarListing[] | null) => void
  ): JSX.Element => {
    const handleSearch = async (
      values: BuyerSearchSchemaType
    ): Promise<void> => {
      const controller = SearchBuyerShortlistController.getInstance();
      try {
        const SearchedCars = await controller.searchBuyerShortlistController(
          email!,
          values.title
        );
        if (setShowData) {
          setShowData(SearchedCars);
        }
        if (SearchedCars) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        console.error(error);
        this.displayErrorUI();
        if (setShowData) {
          setShowData(null);
        }
      }
    };

    return (
      <>
        <BuyerSearchBar handleSearch={handleSearch} />
      </>
    );
  };
  public displaySuccessUI() {
    toast.success("Search Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Search Data Retrieval Failed", errorToast);
  }
}

export default SearchBuyerShortlistUI;
