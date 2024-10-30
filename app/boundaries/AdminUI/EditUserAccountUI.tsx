import { UserAccountEditModal } from "@/components/Modal/UserAccountEditModal";

interface ConfirmEditDialogProps {
  isOpen: boolean;
  initialEmail: string; // New prop for pre-filling email
  initialPassword: string; // New prop for pre-filling password
  onConfirm: (email: string, password: string) => void;
  onCancel: () => void;
}

class EditUserAccountUI {
  private static instance: EditUserAccountUI;
  private constructor() {}

  public static getInstance(): EditUserAccountUI {
    if (!EditUserAccountUI.instance) {
      EditUserAccountUI.instance = new EditUserAccountUI();
    }
    return EditUserAccountUI.instance;
  }

  public displayEditUserAccountUI(props: ConfirmEditDialogProps) {
    return <UserAccountEditModal {...props} />;
  }

  public displaySuccessUI() {
    alert("User Account Updated Successfully");
  }

  public displayErrorUI() {
    alert("User Account Update Failed");
  }
}

export default EditUserAccountUI;
