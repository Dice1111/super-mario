import Loading from "@/app/Loading";
import ErrorToast from "@/components/Toast/ErrorToast";
import SuccessToast from "@/components/Toast/SuccessToast";
import dynamic from "next/dynamic";

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
    const UserProfileTable = dynamic(
      () => import("@/components/Table/UserProfileTable"),
      {
        ssr: false,
        loading: () => <Loading />,
      }
    );

    return <UserProfileTable obj={this} />;
  }

  displaySucessUI() {
    // alert("User Profile Data Retrival Successful");
  }

  displayErrorUI() {
    // alert("User Profile Data Retrival failed");
  }
}

export default ViewUserProfileUI;
