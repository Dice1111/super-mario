import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewUsedCarListingController";
import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

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
  public displayViewUsedCarListingHomeUI = (): JSX.Element => {
    const loadData = async (): Promise<UsedCarListing[]> => {
      const controller = ViewUsedCarListingController.getInstance();
      try {
        const usedCarlisting = await controller.viewUsedCarListingController();
        this.displaySuccessUI();
        return usedCarlisting;
      } catch (error) {
        console.error(error);
        this.displayErrorUI();
        return [];
      }
    };
    return <CarListing loadData={loadData} />;
  };

  public displaySuccessUI() {
    toast.success("Car Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Car Data Retrieval Failed", errorToast);
  }
}

export default ViewUsedCarListingHomeUI;
