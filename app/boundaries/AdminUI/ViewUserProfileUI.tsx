import UserProfileTable from "@/components/Table/UserProfile/UserProfileTable";
import { ViewUserProfileController } from "@/controls/UserProfileControllers/ViewUserProfileController";
import { errorToast, successToast } from "@/lib/utils";
import { UserProfile } from "@prisma/client";
import { toast } from "sonner";

class ViewUserProfileUI {
  private static instance: ViewUserProfileUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewUserProfileUI {
    if (!ViewUserProfileUI.instance) {
      ViewUserProfileUI.instance = new ViewUserProfileUI();
    }
    return ViewUserProfileUI.instance;
  }

  // Method to display the user profile UI
  public displayUserProfileUI() {
    const loadData = async (): Promise<UserProfile[]> => {
      const controller = ViewUserProfileController.getInstance();
      try {
        const data = await controller.viewUserProfileController();
        this.displaySuccessUI();
        return data; // Return the fetched data
      } catch (error) {
        this.displayErrorUI();
        return []; // Return an empty array on error
      }
    };

    return <UserProfileTable loadData={loadData} />; // Pass fetchData to UserProfileTable
  }

  public displaySuccessUI() {
    toast.success("User Profile Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("User Profile Data Retrieval Failed", errorToast);
  }
}

export default ViewUserProfileUI;
