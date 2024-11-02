import CreateUserProfileForm from "@/components/Forms/CreateUserProfileForm";
import { UserProfileFormSchemaType } from "@/components/Forms/UserProfileFormSchema";
import { CreateUserProfileController } from "@/controls/UserProfileControllers/CreateUserProfileController";
import { useRouter } from "next/navigation";

class CreateUserProfileUI {
  private static instance: CreateUserProfileUI;
  private constructor() {}
  public static getInstance(): CreateUserProfileUI {
    if (!CreateUserProfileUI.instance) {
      CreateUserProfileUI.instance = new CreateUserProfileUI();
    }
    return CreateUserProfileUI.instance;
  }

  public displayCreateUserProfileUI = (): JSX.Element => {
    const router = useRouter();
    const submitUserProfile = async (values: UserProfileFormSchemaType) => {
      try {
        const controller = CreateUserProfileController.getInstance();
        const success = await controller.createUserProfileController(
          values.name,
          values.userEmail,
          values.role,
          values.address,
          values.mobileNumber
        );

        if (success) {
          this.displaySuccessUI();
          router.push("/admin/view/user_profile");
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
      }
    };

    return <CreateUserProfileForm submitUserProfile={submitUserProfile} />;
  };
  public displaySuccessUI() {
    alert("Successfully created user profile");
  }

  public displayErrorUI() {
    alert("Failed to create user profile");
  }
}

export default CreateUserProfileUI;
