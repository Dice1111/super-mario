import SellerCarListingTable from "@/components/Table/SellerCarListing/SellerCarListingTable";
import { ViewSellerSpecificUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewSellerSpecificUsedCarListingController";
import { UsedCarListing } from "@prisma/client";
import { useSession } from "next-auth/react";

class ViewSellerUsedCarListing {
  private static instance: ViewSellerUsedCarListing;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewSellerUsedCarListing {
    if (!ViewSellerUsedCarListing.instance) {
      ViewSellerUsedCarListing.instance = new ViewSellerUsedCarListing();
    }
    return ViewSellerUsedCarListing.instance;
  }

  // Method to display the used car listing UI
  public displaySellerUsedCarListingUI = (): JSX.Element => {
    const { data: session, status } = useSession();

    // Conditional rendering to ensure session data is available
    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.email) {
      return <p>Failed to load session information</p>;
    }

    const email = session.user.email;
    console.log(email);
    const loadData = async (): Promise<UsedCarListing[]> => {
      const controller =
        ViewSellerSpecificUsedCarListingController.getInstance();
      try {
        const usedCarlisting =
          await controller.viewSellerSpecificUsedCarListingController(email);
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

export default ViewSellerUsedCarListing;
