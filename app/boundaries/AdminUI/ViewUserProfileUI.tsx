import Loading from "@/app/Loading";
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

  // Method to display the user account UI
  public displayUserProfileUI() {
    const UserProfileTable = dynamic(
      () => import("@/components/Table/UserProfile/UserProfileTable"),
      {
        ssr: false,
        loading: () => <Loading />,
      }
    );

    return <UserProfileTable obj={this} />;
  }
  public displaySucessUI() {
    alert("User Profile Data Retrival Successful");
  }

  public displayErrorUI() {
    alert("User Profile Data Retrival failed");
  }
}

export default ViewUserProfileUI;
