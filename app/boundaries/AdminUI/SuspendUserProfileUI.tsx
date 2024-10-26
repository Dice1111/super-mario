import UserProfileSuspendModal from "@/components/Modal/UserPorfileSuspendModal";
import { UserProfile } from "@prisma/client";

class SuspendUserProfileUI {
  private static instance: SuspendUserProfileUI;
  private constructor() {}
  public static getInstance(): SuspendUserProfileUI {
    if (!SuspendUserProfileUI.instance) {
      SuspendUserProfileUI.instance = new SuspendUserProfileUI();
    }
    return SuspendUserProfileUI.instance;
  }

  public displaySuspendUserProfileUI(userProfile: UserProfile) {
    return <UserProfileSuspendModal data={userProfile} obj={this} />;
  }

  displaySucessUI() {
    alert("User Profile Suspended Successfully");
  }

  displayErrorUI() {
    alert("User Profile Suspended Failed");
  }
}

export default SuspendUserProfileUI;
