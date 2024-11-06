import SellerCarListingTable from "@/components/Table/SellerCarListing/SellerCarListingTable";
import { ViewSellerCarListingController } from "@/controls/SellerCarListingControllers/ViewSellerCarListingController";
import { UsedCarListing } from "@prisma/client";

class ViewSellerCarListing {
  private static instance: ViewSellerCarListing;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewSellerCarListing {
    if (!ViewSellerCarListing.instance) {
      ViewSellerCarListing.instance = new ViewSellerCarListing();
    }
    return ViewSellerCarListing.instance;
  }

  // Method to display the used car listing UI
  public displaySellerCarListingUI = (): JSX.Element => {
    const loadData = async (): Promise<UsedCarListing[]> => {
      const controller = ViewSellerCarListingController.getInstance();
      try {
        const usedCarlisting =
          await controller.viewSellerCarListingController();
        this.displaySuccessUI();
        return usedCarlisting;
      } catch (error) {
        this.displayErrorUI();
        return [];
      }
    };
    return <SellerCarListingTable loadData={loadData} />;
  };

  public displaySuccessUI() {
    alert("User Account Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("User Account Data Retrieval Failed");
  }
}

export default ViewSellerCarListing;
