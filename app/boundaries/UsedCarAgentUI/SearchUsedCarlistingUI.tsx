import SearchBar from "@/components/Search/AdminSearch/SearchBar";
import { AgentSearchSchemaType } from "@/components/Search/AgentSearch/AgentSearchSchema";
import AgentSearchBar from "@/components/Search/AgentSearch/SearchBar";
import { SearchUsedCarListingController } from "@/controls/Controllers/UsedCarListingControllers/SearchUsedCarListingController";

import { UsedCarListing, User, UserProfile } from "@prisma/client";
import { useState } from "react";

class SearchUsedCarListingUI {
  private static instance: SearchUsedCarListingUI;

  private constructor() {}

  public static getInstance(): SearchUsedCarListingUI {
    if (!SearchUsedCarListingUI.instance) {
      SearchUsedCarListingUI.instance = new SearchUsedCarListingUI();
    }
    return SearchUsedCarListingUI.instance;
  }

  public displaySearchUsedCarListingUI = (): JSX.Element => {
    const [searchResult, setSearchResult] = useState<UsedCarListing | null>(
      null
    );

    const handleSearch = async (
      values: AgentSearchSchemaType
    ): Promise<UsedCarListing | null> => {
      const controller = SearchUsedCarListingController.getInstance();
      try {
        const searchedUsedCarListing =
          await controller.searchUsedCarListingController(values.title);
        console.log(searchedUsedCarListing);
        setSearchResult(searchedUsedCarListing);
        this.displaySuccessUI();
        return searchedUsedCarListing;
      } catch (error) {
        this.displayErrorUI();
        return null;
      }
    };

    const renderSearchResult = () => {
      return (
        searchResult && (
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
                  <td className="py-2 px-4 text-gray-700">{searchResult.id}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Email:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {searchResult.agentEmail}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Password:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {searchResult.sellerEmail}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Created Date:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(searchResult.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 font-semibold text-gray-600">
                    Updated Date:
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(searchResult.updatedAt).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      );
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

export default SearchUsedCarListingUI;
