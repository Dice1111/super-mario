import Card from "@/components/Card/Card";
import BuyerSearchBar from "@/components/Search/BuyerSearch/BuyerSearchBar";
import { BuyerSearchSchemaType } from "@/components/Search/BuyerSearch/BuyerSearchSchema";
import { SearchUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchUsedCarListingController";
import { UsedCarListing } from "@prisma/client";
import { useState } from "react";

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
    const [searchResult, setSearchResult] = useState<UsedCarListing[] | null>();
    const handleSearch = async (
      values: BuyerSearchSchemaType
    ): Promise<void> => {
      const controller = SearchUsedCarListingController.getInstance();
      try {
        const SearchedCars = await controller.searchUsedCarListingController(
          values.title
        );
        this.displaySuccessUI();
        SearchedCars ? setSearchResult(SearchedCars) : setSearchResult(null);
      } catch (err) {
        this.displayErrorUI();
        setSearchResult(null);
      }
    };
    return (
      <>
        <BuyerSearchBar handleSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          {searchResult && searchResult.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResult.map((car) => (
                <Card key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <p>No cars available.</p>
          )}
        </div>
      </>
    );
  };
  public displaySuccessUI() {
    alert("Search Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Search Data Retrieval Failed");
  }
}

export default SearchBuyerUsedCarListingUI;
