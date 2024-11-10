import UserAccountTable from "@/components/Table/UserAccount/UserAccountTable";
import { ViewUserAccountsController } from "@/controls/UserAccountContollers/ViewUserAccountController";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { errorToast, successToast } from "@/lib/utils";

class ViewUserAccountUI {
  private static instance: ViewUserAccountUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewUserAccountUI {
    if (!ViewUserAccountUI.instance) {
      ViewUserAccountUI.instance = new ViewUserAccountUI();
    }
    return ViewUserAccountUI.instance;
  }

  // Method to display the user account UI
  public displayUserAccountUI = (): JSX.Element => {
    const loadData = async (): Promise<User[]> => {
      const controller = ViewUserAccountsController.getInstance();
      try {
        const users = await controller.viewUserAccountsController();
        this.displaySuccessUI();

        return users;
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
        return [];
      }
    };

    return <UserAccountTable loadData={loadData} />;
  };

  public displaySuccessUI() {
    toast.success("Data retrieved successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("Data retrieved failed", errorToast);
  }
}

export default ViewUserAccountUI;
