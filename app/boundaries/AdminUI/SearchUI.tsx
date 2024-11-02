import { AdminSearchSchemaType } from "@/components/Search/AdminSearch/AdminSearchSchema";
import AdminSearchBar from "@/components/Search/AdminSearch/SearchBar";
import { SearchUserAccountController } from "@/controls/UserAccountContollers/SearchUserAccountController";
import { SearchUserProfileController } from "@/controls/UserProfileControllers/SearchUserProfileController";

import { User, UserProfile } from "@prisma/client";
import { useState } from "react";

class SearchUI {
  private static instance: SearchUI;

  private constructor() {}

  public static getInstance(): SearchUI {
    if (!SearchUI.instance) {
      SearchUI.instance = new SearchUI();
    }
    return SearchUI.instance;
  }

  public displaySearchUI = (): JSX.Element => {
    const [searchResult, setSearchResult] = useState<User | UserProfile | null>(
      null
    );
    const [searchType, setSearchType] = useState<string>("");
    const handleSearch = async (
      values: AdminSearchSchemaType
    ): Promise<User | UserProfile | null> => {
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
          return searchedUser;
        } catch (error) {
          this.displayErrorUI();
          return null;
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

    const renderSearchResult = () => {
      if (searchType === "account" && (searchResult as User)) {
        const user = searchResult as User;
        return (
          <div className="p-6 rounded-lg shadow-lg mt-3 w-full max-w-lg">
            <table className="min-w-full rounded-lg">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th
                    colSpan={2}
                    className="rounded-sm py-2 px-4 font-semibold text-gray-600 text-left bg-gray-100"
                  >
                    User Account
                  </th>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    User ID:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{user.id}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Email:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{user.email}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Password:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{user.password}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Created Date:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Updated Date:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(user.updatedAt).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Status:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{user.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      } else if (searchType === "profile" && (searchResult as UserProfile)) {
        const profile = searchResult as UserProfile;
        return (
          <div className="p-6 rounded-lg shadow-lg mt-3 w-full max-w-lg">
            <table className="min-w-full rounded-lg">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th
                    colSpan={2}
                    className="rounded-sm py-2 px-4 font-semibold text-gray-600 text-left bg-gray-100"
                  >
                    User Profile
                  </th>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Profile ID:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{profile.id}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Username:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{profile.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Email:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {profile.userEmail}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Address:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{profile.address}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Role:
                  </td>
                  <td className="py-2 px-4 text-gray-700">{profile.role}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Mobile Number:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {profile.mobileNumber}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Created Date:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Updated Date:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default SearchUI;
