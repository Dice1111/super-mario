import { AdminSearchSchemaType } from "@/components/Search/AdminSearch/AdminSearchSchema";
import AdminSearchBar from "@/components/Search/AdminSearch/AdminSearchBar";
import AgentSearchBar from "@/components/Search/AgentSearch/AgentSearchBar";
import SearchOutputFrame from "@/components/Search/SearchOutputFrame";
import { SearchUserAccountController } from "@/controls/UserAccountContollers/SearchUserAccountController";
import { SearchUserProfileController } from "@/controls/UserProfileControllers/SearchUserProfileController";

import { UsedCarListing, User, UserProfile } from "@prisma/client";
import { useState } from "react";
import { AgentSearchSchemaType } from "@/components/Search/AgentSearch/AgentSearchSchema";
import { SearchUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchUsedCarListingController";
import { ClientRequest } from "http";

class UsedCarAgentSearchUI {
  private static instance: UsedCarAgentSearchUI;

  private constructor() {}

  public static getInstance(): UsedCarAgentSearchUI {
    if (!UsedCarAgentSearchUI.instance) {
      UsedCarAgentSearchUI.instance = new UsedCarAgentSearchUI();
    }
    return UsedCarAgentSearchUI.instance;
  }

  public displayUsedCarAgentSearchUI = (): JSX.Element => {
    const [searchResult, setSearchResult] = useState<UsedCarListing | null>(
      null
    );
    const searchType = "used_car_listing";

    const handleSearch = async (
      values: AgentSearchSchemaType
    ): Promise<void> => {
      setSearchResult(null);

      const controller = SearchUsedCarListingController.getInstance();
      try {
        const searchedListing = await controller.searchUsedCarListingController(
          values.title
        );

        console.log(searchedListing);
        setSearchResult(searchedListing);
        this.displaySuccessUI();
      } catch (error) {
        this.displayErrorUI();
      }
    };

    const renderSearchResult = () => {
      if (searchResult) {
        return (
          <SearchOutputFrame entityType={searchType} data={searchResult} />
        );
      }
      return null;
    };

    return (
      <>
        <AgentSearchBar handleSearch={handleSearch} />
        {renderSearchResult()}
      </>
    );
  };

  public displaySuccessUI() {
    alert("Data Found Successfully");
  }

  public displayErrorUI() {
    alert("Data Not Found");
  }
}

export default UsedCarAgentSearchUI;
