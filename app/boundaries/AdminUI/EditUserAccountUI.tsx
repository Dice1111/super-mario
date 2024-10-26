import UserAccountEditModal from "@/components/Modal/UserAccountEditModal";
import { User } from "@prisma/client";

class EditUserAccountUI {
  private static instance: EditUserAccountUI;
  private constructor() {}
  public static getInstance(): EditUserAccountUI {
    if (!EditUserAccountUI.instance) {
      EditUserAccountUI.instance = new EditUserAccountUI();
    }
    return EditUserAccountUI.instance;
  }

  public displayEditUserAccountUI(user: User) {
    return <UserAccountEditModal data={user} obj={this} />;
  }

  displaySucessUI() {
    alert("User Account Updated Successfully");
  }

  displayErrorUI() {
    alert("User Account Updated Failed");
  }
}

export default EditUserAccountUI;
