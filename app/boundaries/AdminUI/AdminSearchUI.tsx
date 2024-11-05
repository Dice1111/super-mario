import { AdminSearchSchemaType } from "@/components/Search/AdminSearch/AdminSearchSchema";
import AdminSearchBar from "@/components/Search/AdminSearch/AdminSearchBar";
import SearchOutputFrame from "@/components/Search/SearchOutputFrame";
import { SearchUserAccountController } from "@/controls/UserAccountContollers/SearchUserAccountController";
import { SearchUserProfileController } from "@/controls/UserProfileControllers/SearchUserProfileController";

import { User, UserProfile } from "@prisma/client";
import { useState } from "react";

class AdminSearchUI {
  private static instance: AdminSearchUI;

  private constructor() {}

  public static getInstance(): AdminSearchUI {
    if (!AdminSearchUI.instance) {
      AdminSearchUI.instance = new AdminSearchUI();
    }
    return AdminSearchUI.instance;
  }

  public displayAdminSearchUI = (): JSX.Element => {
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
          const searchedUser = await controller.SearchUserAccountController(
            values.email
          );
          console.log(searchedUser);
          setSearchResult(searchedUser);
          this.displaySuccessUI();
        } catch (error) {
          this.displayErrorUI();
        }
      } else if (values.searchType === "profile") {
        setSearchType(values.searchType);
        const controller = SearchUserProfileController.getInstance();
        try {
          const searchedProfile = await controller.searchUserProfileController(
            values.email
          );
          console.log(searchedProfile);
          setSearchResult(searchedProfile);
          this.displaySuccessUI();
        } catch (error) {
          this.displayErrorUI();
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
    alert("Data Found Successfully");
  }

  public displayErrorUI() {
    alert("Data Not Found");
  }
}

export default AdminSearchUI;
