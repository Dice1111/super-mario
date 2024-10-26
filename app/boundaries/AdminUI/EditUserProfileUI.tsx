import UserProfileEditModal from "@/components/Modal/UserProfileEditModal";
import { User, UserProfile } from "@prisma/client";

class EditUserProfileUI {
  private static instance: EditUserProfileUI;
  private constructor() {}
  public static getInstance(): EditUserProfileUI {
    if (!EditUserProfileUI.instance) {
      EditUserProfileUI.instance = new EditUserProfileUI();
    }
    return EditUserProfileUI.instance;
  }

  public displayEditUserProfileUI(UserProfile: UserProfile) {
    return <UserProfileEditModal data={UserProfile} obj={this} />;
  }

  displaySucessUI() {
    alert("User Profile Updated Successfully");
  }

  displayErrorUI() {
    alert("User Profile Updated Failed");
  }
}

export default EditUserProfileUI;
