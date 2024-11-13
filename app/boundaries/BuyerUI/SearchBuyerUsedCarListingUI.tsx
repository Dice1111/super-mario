// SearchBuyerUsedCarListingUI.tsx

import CarListing from "@/components/Lists/CarListing/CarListing";
import BuyerSearchBar from "@/components/Search/BuyerSearch/BuyerSearchBar";
import { BuyerSearchSchemaType } from "@/components/Search/BuyerSearch/BuyerSearchSchema";
import { SearchUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchUsedCarListingController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { useEffect, useState } from "react";
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
    const [needRefetch, setNeedRefetch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string | null>(null);

    const handleSearch = async (
      values: BuyerSearchSchemaType
    ): Promise<void> => {
      setSearchValue(values.title);
      if (values.title === "") {
        setSearchResult(null);
        return;
      }

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

    const loadData = async (page: number, pageSize: number) => {
      const dataToDisplay = searchResult;
      const totalCount = dataToDisplay!.length;
      const offset = (page - 1) * pageSize;
      const cars = dataToDisplay!.slice(offset, offset + pageSize);
      return { cars, totalCount };
    };

    useEffect(() => {
      if (needRefetch && searchResult) {
        handleSearch({ title: searchValue! });
        setNeedRefetch(false);
      }
    }, [needRefetch]);

    return (
      <>
        <BuyerSearchBar handleSearch={handleSearch} />
        {searchResult && (
          <CarListing loadData={loadData} setNeedRefetch={setNeedRefetch} />
        )}
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
