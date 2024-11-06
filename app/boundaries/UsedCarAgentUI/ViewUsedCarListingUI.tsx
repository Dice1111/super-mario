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
