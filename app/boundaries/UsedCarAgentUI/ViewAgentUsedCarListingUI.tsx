"use client";

import UsedCarListingTable from "@/components/Table/UsedCarListing/UsedCarListingTable";
import { ViewAgentSpecifcUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewAgentSpecificUsedCarLisitingController";
import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

class ViewAgentUsedCarListingUI {
  private static instance: ViewAgentUsedCarListingUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewAgentUsedCarListingUI {
    if (!ViewAgentUsedCarListingUI.instance) {
      ViewAgentUsedCarListingUI.instance = new ViewAgentUsedCarListingUI();
    }
    return ViewAgentUsedCarListingUI.instance;
  }

  // Method to display the used car listing UI
  public displayAgentUsedCarListingUI = (): JSX.Element => {
    const { data: session, status } = useSession();

    // Conditional rendering to ensure session data is available
    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.email) {
      return <p>Failed to load session information</p>;
    }

    const email = session.user.email;

    const loadData = async (): Promise<UsedCarListing[]> => {
      const controller = ViewAgentSpecifcUsedCarListingController.getInstance();
      try {
        const usedCarlisting =
          await controller.viewAgentSpecifcUsedCarListingController(email);

        this.displaySuccessUI();
        return usedCarlisting;
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
        return [];
      }
    };

    return <UsedCarListingTable loadData={loadData} />;
  };

  public displaySuccessUI() {
    toast.success("Car Data Found Successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("Car Data Not Found", errorToast);
  }
}

export default ViewAgentUsedCarListingUI;
