// SearchBuyerUsedCarListingUI.tsx

import React, { useState, useCallback } from "react";
import CarListing from "@/components/Lists/CarListing/CarListing";
import BuyerSearchBar from "@/components/Search/BuyerSearch/BuyerSearchBar";
import { BuyerSearchSchemaType } from "@/components/Search/BuyerSearch/BuyerSearchSchema";
import { SearchUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchUsedCarListingController";
import { UsedCarListing } from "@prisma/client";
import { successToast, errorToast } from "@/lib/utils";
import { toast } from "sonner";

class SearchBuyerUsedCarListingUI {
  private static instance: SearchBuyerUsedCarListingUI;

  private constructor() {}

  public static getInstance(): SearchBuyerUsedCarListingUI {
    if (!SearchBuyerUsedCarListingUI.instance) {
      SearchBuyerUsedCarListingUI.instance = new SearchBuyerUsedCarListingUI();
    }
    return SearchBuyerUsedCarListingUI.instance;
  }

  public displaySearchBuyerUsedCarListingUI = (): JSX.Element => {
    const [searchResult, setSearchResult] = useState<UsedCarListing[] | null>(
      null
    );

    const handleSearch = async (
      values: BuyerSearchSchemaType
    ): Promise<void> => {
      const controller = SearchUsedCarListingController.getInstance();
      try {
        const SearchedCars = await controller.searchUsedCarListingController(
          values.title
        );
        setSearchResult(SearchedCars);
        if (SearchedCars) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        console.error(error);
        this.displayErrorUI();
        setSearchResult(null);
      }
    };

    const loadData = useCallback(
      async () => searchResult || [],
      [searchResult]
    );

    return (
      <>
        <BuyerSearchBar handleSearch={handleSearch} />
        <CarListing loadData={loadData} />
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

export default SearchBuyerUsedCarListingUI;
