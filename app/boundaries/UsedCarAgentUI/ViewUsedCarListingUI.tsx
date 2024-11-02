import UsedCarListingTable from "@/components/Table/UsedCarListing/UsedCarListingTable";
import { ViewUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewUsedCarListingController";
import { UsedCarListing } from "@prisma/client";

class ViewUsedCarListingUI {
  private static instance: ViewUsedCarListingUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewUsedCarListingUI {
    if (!ViewUsedCarListingUI.instance) {
      ViewUsedCarListingUI.instance = new ViewUsedCarListingUI();
    }
    return ViewUsedCarListingUI.instance;
  }

  // Method to display the used car listing UI
  public displayUsedCarListingUI = (): JSX.Element => {
    const loadData = async (): Promise<UsedCarListing[]> => {
      const controller = ViewUsedCarListingController.getInstance();
      try {
        const usedCarlisting = await controller.viewUsedCarListingController();
        this.displaySuccessUI();
        return usedCarlisting;
      } catch (error) {
        this.displayErrorUI();
        return [];
      }
    };

    // const loadData = async (): Promise<UsedCarListing[]> => {
    //   return [
    //     {
    //       id: "cl8x8fjkl0001qys7g0f1u5ds",
    //       title: "2020 Toyota Camry",
    //       agentEmail: "apple@gmail.com",
    //       sellerEmail: "banana@gmail.com",
    //       mileage: 15000,
    //       color: "White",
    //       condition: "Excellent",
    //       imgUrl: "toyota_camry.jpg",
    //       manufacturedYear: 2020,
    //       price: 22000.0,
    //       description: "A well-maintained Toyota Camry with low mileage.",
    //       createdAt: new Date("2024-10-15T10:00:00.000Z"),
    //       updatedAt: new Date("2024-10-15T10:00:00.000Z"),
    //     },
    //   ];
    // };

    return <UsedCarListingTable loadData={loadData} />;
  };

  public displaySuccessUI() {
    alert("User Account Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("User Account Data Retrieval Failed");
  }
}

export default ViewUsedCarListingUI;
