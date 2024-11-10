import AdminSearchBar from "@/components/Search/AdminSearch/AdminSearchBar";
import { AdminSearchSchemaType } from "@/components/Search/AdminSearch/AdminSearchSchema";
import SearchOutputFrame from "@/components/Search/SearchOutputFrame";
import { SearchUserAccountController } from "@/controls/UserAccountContollers/SearchUserAccountController";
import { SearchUserProfileController } from "@/controls/UserProfileControllers/SearchUserProfileController";
import { errorToast, successToast } from "@/lib/utils";
import { User, UserProfile } from "@prisma/client";

import { useState } from "react";
import { toast } from "sonner";

class SearchAdminUI {
  private static instance: SearchAdminUI;

  private constructor() {}

  public static getInstance(): SearchAdminUI {
    if (!SearchAdminUI.instance) {
      SearchAdminUI.instance = new SearchAdminUI();
    }
    return SearchAdminUI.instance;
  }

  public displaySearchAdminUI = (): JSX.Element => {
    const [searchResult, setSearchResult] = useState<User | UserProfile | null>(
      null
    );
    const [searchType, setSearchType] = useState<string>("");

    const handleSearch = async (
      values: AdminSearchSchemaType
    ): Promise<void> => {
      setSearchResult(null);
      console.log(values.email, values.searchType);

      if (values.searchType === "account") {
        setSearchType(values.searchType);
        const controller = SearchUserAccountController.getInstance();
        try {
          const searchedUser = await controller.searchUserAccountController(
            values.email
          );
          setSearchResult(searchedUser);
          searchedUser ? this.displaySuccessUI() : this.displayErrorUI();
        } catch (error) {
          this.displayErrorUI();
          console.error(error);
        }
      } else if (values.searchType === "profile") {
        setSearchType(values.searchType);
        const controller = SearchUserProfileController.getInstance();
        try {
          const searchedProfile = await controller.searchUserProfileController(
            values.email
          );
          setSearchResult(searchedProfile);
          searchedProfile ? this.displaySuccessUI() : this.displayErrorUI();
          this.displaySuccessUI();
        } catch (error) {
          this.displayErrorUI();
          console.error(error);
        }
      } else {
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
        <AdminSearchBar handleSearch={handleSearch} />
        {renderSearchResult()}
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

export default SearchAdminUI;
