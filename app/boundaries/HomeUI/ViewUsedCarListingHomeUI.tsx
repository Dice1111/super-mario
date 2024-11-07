import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewUsedCarListingController";
import { UsedCarListing } from "@prisma/client";

class ViewUsedCarListingHomeUI {
  private static instance: ViewUsedCarListingHomeUI;

  private constructor() {}

  public static getInstance(): ViewUsedCarListingHomeUI {
    if (!ViewUsedCarListingHomeUI.instance) {
      ViewUsedCarListingHomeUI.instance = new ViewUsedCarListingHomeUI();
    }
    return ViewUsedCarListingHomeUI.instance;
  }

  // Method to display the used car listing UI
  public displayUsedCarListingHomeUI = (): JSX.Element => {
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
    return <CarListing loadData={loadData} />;
  };

  public displaySuccessUI() {
    alert("User Account Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("User Account Data Retrieval Failed");
  }
}

export default ViewUsedCarListingHomeUI;
