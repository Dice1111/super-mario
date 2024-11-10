import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewTopUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewTopUsedCarListingController";
import { ViewUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewUsedCarListingController";
import { UsedCarListing } from "@prisma/client";

class ViewTopCarListingUI {
  private static instance: ViewTopCarListingUI;

  private constructor() {}

  public static getInstance(): ViewTopCarListingUI {
    if (!ViewTopCarListingUI.instance) {
      ViewTopCarListingUI.instance = new ViewTopCarListingUI();
    }
    return ViewTopCarListingUI.instance;
  }

  public displayViewTopCarListingUI = (): JSX.Element => {
    const loadData = async (): Promise<UsedCarListing[]> => {
      const controller = ViewTopUsedCarListingController.getInstance();
      try {
        const usedCarlisting =
          await controller.viewTopUsedCarListingController();

        console.log(usedCarlisting);
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

export default ViewTopCarListingUI;
