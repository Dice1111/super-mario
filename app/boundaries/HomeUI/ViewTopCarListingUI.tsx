import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewTopUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewTopUsedCarListingController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

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
    toast.success("Popular Car Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Popular Car Data Retrieval Failed", errorToast);
  }
}

export default ViewTopCarListingUI;
