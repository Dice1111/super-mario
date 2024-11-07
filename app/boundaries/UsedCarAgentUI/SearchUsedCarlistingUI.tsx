// import SearchBar from "@/components/Search/AdminSearch/AdminSearchBar";
// import { AgentSearchSchemaType } from "@/components/Search/AgentSearch/AgentSearchSchema";
// import AgentSearchBar from "@/components/Search/AgentSearch/AgentSearchBar";
// import { SearchUsedCarListingController } from "@/controls/UsedCarListingControllers/SearchUsedCarListingController";

// import { UsedCarListing, User, UserProfile } from "@prisma/client";
// import { useState } from "react";

// class SearchUsedCarListingUI {
//   private static instance: SearchUsedCarListingUI;

//   private constructor() {}

//   public static getInstance(): SearchUsedCarListingUI {
//     if (!SearchUsedCarListingUI.instance) {
//       SearchUsedCarListingUI.instance = new SearchUsedCarListingUI();
//     }
//     return SearchUsedCarListingUI.instance;
//   }

//   public displaySearchUsedCarListingUI = (): JSX.Element => {
//     const [searchResult, setSearchResult] = useState<UsedCarListing[] | null>(
//       null
//     );

//     const handleSearch = async (
//       values: AgentSearchSchemaType
//     ): Promise<void> => {
//       const controller = SearchUsedCarListingController.getInstance();
//       try {
//         const searchedUsedCarListing =
//           await controller.searchUsedCarListingController(values.title);
//         console.log("obj:", searchedUsedCarListing);
//         setSearchResult(searchedUsedCarListing);
//         this.displaySuccessUI();
//       } catch (error) {
//         this.displayErrorUI();
//       }
//     };

//     const renderSearchResult = () => {
//       return (
//         searchResult &&
//         searchResult.length > 0 && (
//           <div className="p-6 rounded-lg shadow-lg mt-3 w-full max-w-lg">
//             {searchResult.map((result, index) => (
//               <table key={index} className="min-w-full rounded-lg mb-4">
//                 <tbody>
//                   <tr className="border-b border-gray-200">
//                     <th
//                       colSpan={2}
//                       className="rounded-sm py-2 px-4 font-semibold text-gray-600 text-left bg-gray-100"
//                     >
//                       User Account
//                     </th>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 px-4 font-semibold text-gray-600">
//                       User ID:
//                     </td>
//                     <td className="py-2 px-4 text-gray-700">{result.id}</td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 px-4 font-semibold text-gray-600">
//                       Email:
//                     </td>
//                     <td className="py-2 px-4 text-gray-700">
//                       {result.agentEmail}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 px-4 font-semibold text-gray-600">
//                       Seller Email:
//                     </td>
//                     <td className="py-2 px-4 text-gray-700">
//                       {result.sellerEmail}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 px-4 font-semibold text-gray-600">
//                       Created Date:
//                     </td>
//                     <td className="py-2 px-4 text-gray-700">
//                       {new Date(result.createdAt).toLocaleString()}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 px-4 font-semibold text-gray-600">
//                       Updated Date:
//                     </td>
//                     <td className="py-2 px-4 text-gray-700">
//                       {new Date(result.updatedAt).toLocaleString()}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             ))}
//           </div>
//         )
//       );
//     };

//     return (
//       <>
//         <AgentSearchBar handleSearch={handleSearch} />
//         {renderSearchResult()}
//       </>
//     );
//   };

//   public displaySuccessUI() {
//     alert("Data Found Successfully");
//   }

//   public displayErrorUI() {
//     alert("Data Not Found");
//   }
// }

// export default SearchUsedCarListingUI;
