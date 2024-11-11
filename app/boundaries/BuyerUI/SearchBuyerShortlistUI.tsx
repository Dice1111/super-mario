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

  public displaySearchBuyerShortlistUI = (email?: string): JSX.Element => {
    const [searchResult, setSearchResult] = useState<UsedCarListing[] | null>(
      null
    );

    const handleSearch = async (
      values: BuyerSearchSchemaType
    ): Promise<void> => {
      const controller = SearchBuyerShortlistController.getInstance();
      try {
        const SearchedCars = await controller.searchBuyerShortlistController(
          email!,
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

export default SearchBuyerShortlistUI;
