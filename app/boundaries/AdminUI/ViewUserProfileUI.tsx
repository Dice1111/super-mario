import UserProfileTable from "@/components/Table/UserProfile/UserProfileTable";
import { ViewUserProfileController } from "@/controls/Controllers/UserProfileControllers/ViewUserProfileController";
import { UserProfile } from "@prisma/client";

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
    alert("User Profile Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("User Profile Data Retrieval Failed");
  }
}

export default ViewUserProfileUI;
