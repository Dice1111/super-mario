import UserAccountTable from "@/components/Table/UserAccount/UserAccountTable";
import { ViewUserAccountsController } from "@/controls/Controllers/UserAccountContollers/ViewUserAccountController";
import { User } from "@prisma/client";
import { useState } from "react";

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
        return [];
      }
    };

    return <UserAccountTable loadData={loadData} />;
  };

  public displaySuccessUI() {
    alert("User Account Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("User Account Data Retrieval Failed");
  }
}

export default ViewUserAccountUI;
