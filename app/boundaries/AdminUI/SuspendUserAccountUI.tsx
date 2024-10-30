// SuspendBoundary.tsx

import UserAccountSuspendModal from "@/components/Modal/UserAccountSuspendModal";

interface ConfirmStatusDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

class SuspendUserAccountUI {
  private static instance: SuspendUserAccountUI;
  private constructor() {}

  public static getInstance(): SuspendUserAccountUI {
    if (!SuspendUserAccountUI.instance) {
      SuspendUserAccountUI.instance = new SuspendUserAccountUI();
    }
    return SuspendUserAccountUI.instance;
  }

  public displaySuspendUserAccountUI(props: ConfirmStatusDialogProps) {
    return <UserAccountSuspendModal {...props} />;
  }

  public displaySuccessUI() {
    alert("User Account Suspended Successfully");
  }

  public displayErrorUI() {
    alert("User Account Suspension Failed");
  }
}

export default SuspendUserAccountUI;
