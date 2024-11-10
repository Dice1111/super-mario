import UserAccountSuspendModal from "@/components/Modal/UserAccountSuspendModal";
import { SuspendUserAccountController } from "@/controls/UserAccountContollers/SuspendUserAccountController";
import { errorToast, successToast } from "@/lib/utils";
import { Status, User } from "@prisma/client";
import { toast } from "sonner";

class SuspendUserAccountUI {
  private static instance: SuspendUserAccountUI;
  private constructor() {}

  public static getInstance(): SuspendUserAccountUI {
    if (!SuspendUserAccountUI.instance) {
      SuspendUserAccountUI.instance = new SuspendUserAccountUI();
    }
    return SuspendUserAccountUI.instance;
  }

  public displaySuspendUserAccountUI = (
    selectedUser: User,
    fetchData: () => Promise<void>
  ): JSX.Element => {
    const handleConfirm = async () => {
      const newStatus =
        selectedUser.status === Status.active ? Status.inactive : Status.active;
      const controller = SuspendUserAccountController.getInstance();

      try {
        const success = await controller.suspendUserAccountController(
          selectedUser.id,
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
      <UserAccountSuspendModal
        selectedUser={selectedUser}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    );
  };

  public displaySuccessUI() {
    toast.success("User Account Suspended Successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("User Account Suspension Failed", errorToast);
  }
}

export default SuspendUserAccountUI;
