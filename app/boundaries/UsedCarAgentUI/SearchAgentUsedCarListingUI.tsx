import AgentSearchBar from "@/components/Search/AgentSearch/AgentSearchBar";
import SearchOutputFrame from "@/components/Search/SearchOutputFrame";

import { AgentSearchSchemaType } from "@/components/Search/AgentSearch/AgentSearchSchema";
import { SearchAgentSpecificUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchAgentSpecificUsedCarListingController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

class SearchAgentUsedCarListingUI {
  private static instance: SearchAgentUsedCarListingUI;

  private constructor() {}

  public static getInstance(): SearchAgentUsedCarListingUI {
    if (!SearchAgentUsedCarListingUI.instance) {
      SearchAgentUsedCarListingUI.instance = new SearchAgentUsedCarListingUI();
    }
    return SearchAgentUsedCarListingUI.instance;
  }

  public displaySearchAgentUsedCarListingUI = (): JSX.Element => {
    const { data: session, status } = useSession();
    const [searchResult, setSearchResult] = useState<UsedCarListing[] | null>(
      null
    );

    // Conditional rendering to ensure session data is available
    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.email) {
      return <p>Failed to load session information</p>;
    }

    const email = session.user.email;
    const searchType = "used_car_listing";

    const handleSearch = async (
      values: AgentSearchSchemaType
    ): Promise<void> => {
      setSearchResult(null);

      const controller =
        SearchAgentSpecificUsedCarListingController.getInstance();
      try {
        const searchedListing =
          await controller.searchAgentSpecificUsedCarListingController(
            email,
            values.title
          );
        searchedListing ? this.displaySuccessUI() : this.displayErrorUI();
        setSearchResult(searchedListing);
      } catch (error) {
        this.displayErrorUI();
      }
    };

    const renderSearchResult = () => {
      return <SearchOutputFrame entityType={searchType} data={searchResult} />;
    };

    return (
      <>
        <AgentSearchBar handleSearch={handleSearch} />

        {searchResult ? (
          renderSearchResult()
        ) : (
          <p className="mt-5">No Search Data To Show</p>
        )}
      </>
    );
  };

  public displaySuccessUI() {
    toast.success("Data Found Successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("Data Not Found", errorToast);
  }
}

export default SearchAgentUsedCarListingUI;
