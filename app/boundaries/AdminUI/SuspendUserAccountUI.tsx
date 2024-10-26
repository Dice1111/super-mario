import UserAccountSuspendModal from "@/components/Modal/UserAccountSuspendModal";
import { User } from "@prisma/client";

class SuspendUserAccountUI {
  private static instance: SuspendUserAccountUI;
  private constructor() {}
  public static getInstance(): SuspendUserAccountUI {
    if (!SuspendUserAccountUI.instance) {
      SuspendUserAccountUI.instance = new SuspendUserAccountUI();
    }
    return SuspendUserAccountUI.instance;
  }

  public displaySuspendUserAccountUI(user: User) {
    return <UserAccountSuspendModal data={user} obj={this} />;
  }

  displaySucessUI() {
    alert("User Account Suspended Successfully");
  }

  displayErrorUI() {
    alert("User Account Suspended Failed");
  }
}

export default SuspendUserAccountUI;
