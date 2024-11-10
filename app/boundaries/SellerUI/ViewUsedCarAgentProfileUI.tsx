import UsedCarAgentProfileTable from "@/components/Table/UsedCarAgentProfile/UsedCarAgentProfileTable";
import { ViewUsedCarAgentProfileController } from "@/controls/UsedCarListingControllers/ViewUsedCarAgentProfileController";
import { successToast, errorToast } from "@/lib/utils";

import { UserProfile } from "@prisma/client";
import { toast } from "sonner";

class ViewUsedCarAgentProfileUI {
  private static instance: ViewUsedCarAgentProfileUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewUsedCarAgentProfileUI {
    if (!ViewUsedCarAgentProfileUI.instance) {
      ViewUsedCarAgentProfileUI.instance = new ViewUsedCarAgentProfileUI();
    }
    return ViewUsedCarAgentProfileUI.instance;
  }

  // Method to display the used car listing UI
  public displayUsedCarAgentProfileUI = (): JSX.Element => {
    const loadData = async (): Promise<UserProfile[]> => {
      const controller = ViewUsedCarAgentProfileController.getInstance();
      try {
        const usedCarlisting =
          await controller.viewUsedCarAgentProfileController();
        this.displaySuccessUI();
        return usedCarlisting;
      } catch (error) {
        this.displayErrorUI();
        return [];
      }
    };
    return <UsedCarAgentProfileTable loadData={loadData} />;
  };

  public displaySuccessUI() {
    toast.success("Agent Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Agent Data Retrieval Failed", errorToast);
  }
}

export default ViewUsedCarAgentProfileUI;
