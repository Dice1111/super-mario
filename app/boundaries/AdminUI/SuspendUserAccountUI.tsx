import UserAccountSuspendModal from "@/components/Modal/UserAccountSuspendModal";
import { SuspendUserAccountController } from "@/controls/Controllers/UserAccountContollers/SuspendUserAccountController";
import { Status, User } from "@prisma/client";

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
    alert("User Account Suspended Successfully");
  }

  public displayErrorUI() {
    alert("User Account Suspension Failed");
  }
}

export default SuspendUserAccountUI;
