import UserProfileSuspendModal from "@/components/Modal/UserPorfileSuspendModal";
import { UserProfile } from "@prisma/client";

interface ConfirmStatusDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

class SuspendUserProfileUI {
  private static instance: SuspendUserProfileUI;
  private constructor() {}
  public static getInstance(): SuspendUserProfileUI {
    if (!SuspendUserProfileUI.instance) {
      SuspendUserProfileUI.instance = new SuspendUserProfileUI();
    }
    return SuspendUserProfileUI.instance;
  }

  public displaySuspendUserProfileUI(props: ConfirmStatusDialogProps) {
    return <UserProfileSuspendModal {...props} />;
  }

  displaySuccessUI() {
    alert("User Profile Suspended Successfully");
  }

  displayErrorUI() {
    alert("User Profile Suspended Failed");
  }
}

export default SuspendUserProfileUI;
