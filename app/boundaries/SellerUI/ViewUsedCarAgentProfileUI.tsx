import UsedCarAgentProfileTable from "@/components/Table/UsedCarAgentProfile/UsedCarAgentProfileTable";
import { ViewUsedCarAgentProfileController } from "@/controls/UsedCarListingControllers/ViewUsedCarAgentProfileController";

import { UserProfile } from "@prisma/client";

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
    alert("User Account Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("User Account Data Retrieval Failed");
  }
}

export default ViewUsedCarAgentProfileUI;
