import SearchBar from "@/components/Search/SearchBar";
import { searchSchemaType } from "@/components/Search/SearchSchema";
import { SearchUserAccountController } from "@/controls/Controllers/UserAccountContollers/SearchUserAccountController";
import { SearchUserProfileController } from "@/controls/Controllers/UserProfileControllers/SearchUserProfileController";
import { User, UserProfile } from "@prisma/client";

class SearchUI {
  private static instance: SearchUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): SearchUI {
    if (!SearchUI.instance) {
      SearchUI.instance = new SearchUI();
    }
    return SearchUI.instance;
  }

  // Method to display the user account UI
  public displaySearchUI = (): JSX.Element => {
    const handleSearch = async (
      values: searchSchemaType
    ): Promise<User | UserProfile | null> => {
      console.log(values.email, values.searchType);
      if (values.searchType === "account") {
        const controller = SearchUserAccountController.getInstance();
        try {
          const searchedUser = await controller.SearchUserAccountController(
            values.email
          );
          console.log(searchedUser);
          this.displaySuccessUI();
          return searchedUser;
        } catch (error) {
          this.displayErrorUI();
          return null;
        }
      } else if (values.searchType === "profile") {
        const controller = SearchUserProfileController.getInstance();
        try {
          const searchedProfile = await controller.searchUserProfileController(
            values.email
          );
          console.log(searchedProfile);
          this.displaySuccessUI();
          return searchedProfile;
        } catch (error) {
          this.displayErrorUI();
          return null;
        }
      } else {
        this.displayErrorUI();
        return null;
      }
    };

    return (
      <>
        <SearchBar handleSearch={handleSearch} />
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

export default SearchUI;
