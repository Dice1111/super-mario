import CreateUserProfileForm from "@/components/Forms/CreateUserProfileForm";
import { UserProfileFormSchemaType } from "@/components/Forms/UserProfileFormSchema";
import { CreateUserProfileController } from "@/controls/UserProfileControllers/CreateUserProfileController";
import { errorToast, successToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      } catch {
        this.displayErrorUI();
      }
    };

    return <CreateUserProfileForm submitUserProfile={submitUserProfile} />;
  };

  public displaySuccessUI() {
    toast.success("Successfully created user profile", successToast);
  }

  public displayErrorUI() {
    toast.error("Failed to create user profile", errorToast);
  }
}

export default CreateUserProfileUI;
