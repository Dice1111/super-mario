import UserProfileSuspendModal from "@/components/Modal/UserPorfileSuspendModal";
import { SuspendUserProfileController } from "@/controls/UserProfileControllers/SuspendUserProfileController";
import { Status, UserProfile } from "@prisma/client";

class SuspendUserProfileUI {
  private static instance: SuspendUserProfileUI;
  private constructor() {}
  public static getInstance(): SuspendUserProfileUI {
    if (!SuspendUserProfileUI.instance) {
      SuspendUserProfileUI.instance = new SuspendUserProfileUI();
    }
    return SuspendUserProfileUI.instance;
  }

  public displaySuspendUserProfileUI = (
    selectedUserProfile: UserProfile,
    fetchData: () => Promise<void>
  ): JSX.Element => {
    const handleConfirm = async () => {
      const newStatus =
        selectedUserProfile.status === Status.active
          ? Status.inactive
          : Status.active;

      const controller = SuspendUserProfileController.getInstance();

      try {
        const success = await controller.suspendUserProfileController(
          selectedUserProfile.id,
          newStatus
        );
        if (success) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
      }
      await fetchData();
    };

    const handleCancel = async () => {
      await fetchData();
    };

    return (
      <UserProfileSuspendModal
        selectedUserProfile={selectedUserProfile}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    );
  };

  displaySuccessUI() {
    alert("User Profile Suspended Successfully");
  }

  displayErrorUI() {
    alert("User Profile Suspended Failed");
  }
}

export default SuspendUserProfileUI;
