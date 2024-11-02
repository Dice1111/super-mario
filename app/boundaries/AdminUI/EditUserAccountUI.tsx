import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { UserAccountEditModal } from "@/components/Modal/UserAccountEditModal";
import { EditUserAccountController } from "@/controls/UserAccountContollers/EditUserAccountController";
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

  public displayEditUserAccountUI = (
    selectedUser: User,
    fetchData: () => Promise<void>
  ): JSX.Element => {
    const submitEditUserAccount = async (values: UserAccountFormSchemaType) => {
      try {
        const controller = EditUserAccountController.getInstance();
        const success = await controller.editUserAccountController(
          selectedUser.id,
          values.email,
          values.password
        );

        if (success) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
      }
      await fetchData();
    };
    const handleCancel = async () => {
      await fetchData();
    };

    return (
      <UserAccountEditModal
        selectedUser={selectedUser}
        submitEditUserAccount={submitEditUserAccount}
        handleCancel={handleCancel}
      />
    );
  };

  public displaySuccessUI() {
    alert("User Account Updated Successfully");
  }

  public displayErrorUI() {
    alert("User Account Update Failed");
  }
}

export default EditUserAccountUI;
