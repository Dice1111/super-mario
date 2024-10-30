import { UserProfileEditModal } from "@/components/Modal/UserProfileEditModal";
import { Role, UserProfile } from "@prisma/client";

interface ConfirmEditDialogProps {
  isOpen: boolean;
  initialName: string;
  initialAddress: string | null;
  initialMobileNumber: string | null;
  initialRole: Role;
  onConfirm: (
    name: string,
    address: string,
    mobileNumber: string,
    role: Role
  ) => void;
  onCancel: () => void;
}

class EditUserProfileUI {
  private static instance: EditUserProfileUI;
  private constructor() {}
  public static getInstance(): EditUserProfileUI {
    if (!EditUserProfileUI.instance) {
      EditUserProfileUI.instance = new EditUserProfileUI();
    }
    return EditUserProfileUI.instance;
  }

  public displayEditUserProfileUI(props: ConfirmEditDialogProps) {
    return <UserProfileEditModal {...props} />;
  }

  displaySuccessUI() {
    alert("User Profile Updated Successfully");
  }

  displayErrorUI() {
    alert("User Profile Updated Failed");
  }
}

export default EditUserProfileUI;
