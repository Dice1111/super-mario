// SuspendBoundary.tsx

import ConfirmStatusDialog from "@/components/Modal/ConfirmModal";

interface ConfirmStatusDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

class SuspendBoundary {
  private static instance: SuspendBoundary;
  private constructor() {}

  public static getInstance(): SuspendBoundary {
    if (!SuspendBoundary.instance) {
      SuspendBoundary.instance = new SuspendBoundary();
    }
    return SuspendBoundary.instance;
  }

  public displaySuspendBoundary(props: ConfirmStatusDialogProps) {
    return <ConfirmStatusDialog {...props} />;
  }

  public displaySuccessUI() {
    alert("User Account Suspended Successfully");
  }

  public displayErrorUI() {
    alert("User Account Suspension Failed");
  }
}

export default SuspendBoundary;
