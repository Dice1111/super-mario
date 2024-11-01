import { UserProfileFormSchemaType } from "@/components/Forms/UserProfileFormSchema";
import { UserProfileEditModal } from "@/components/Modal/UserProfileEditModal";
import { EditUserProfileController } from "@/controls/Controllers/UserProfileControllers/EditUserProfileController";
import { UserProfile } from "@prisma/client";

class EditUserProfileUI {
  private static instance: EditUserProfileUI;
  private constructor() {}
  public static getInstance(): EditUserProfileUI {
    if (!EditUserProfileUI.instance) {
      EditUserProfileUI.instance = new EditUserProfileUI();
    }
    return EditUserProfileUI.instance;
  }

  public displayEditUserProfileUI = (
    selectedUserProfile: UserProfile,
    fetchData: () => Promise<void>
  ): JSX.Element => {
    const submitEditUserProfile = async (values: UserProfileFormSchemaType) => {
      try {
        const controller = EditUserProfileController.getInstance();
        const success = await controller.editUserProfileController(
          selectedUserProfile.id,
          values.name,
          values.role,
          values.address,
          values.mobileNumber
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
      <UserProfileEditModal
        selectedUserProfile={selectedUserProfile}
        submitEditUserProfile={submitEditUserProfile}
        handleCancel={handleCancel}
      />
    );
  };

  displaySuccessUI() {
    alert("User Profile Updated Successfully");
  }

  displayErrorUI() {
    alert("User Profile Updated Failed");
  }
}

export default EditUserProfileUI;
