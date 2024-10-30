import Loading from "@/app/Loading";
import dynamic from "next/dynamic";

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
  public displayUserAccountUI() {
    const UserAccountTable = dynamic(
      () => import("@/components/Table/UserAccount/UserAccountTable"),
      {
        ssr: false,
        loading: () => <Loading />,
      }
    );

    return <UserAccountTable obj={this} />;
  }
  public displaySucessUI() {
    alert("User Account Data Retrival Successful");
  }

  public displayErrorUI() {
    alert("User Account Data Retrival failed");
  }
}

export default ViewUserAccountUI;
