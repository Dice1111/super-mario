import CreateUserAccountForm from "@/components/Forms/CreateUserAccountForm";
import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { CreateUserAccountController } from "@/controls/UserAccountContollers/CreateUserAccountController";
import { errorToast, successToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

class CreateUserAccountUI {
  private static instance: CreateUserAccountUI;
  private constructor() {}
  public static getInstance(): CreateUserAccountUI {
    if (!CreateUserAccountUI.instance) {
      CreateUserAccountUI.instance = new CreateUserAccountUI();
    }
    return CreateUserAccountUI.instance;
  }

  public displayCreateUserAccountUI = (): JSX.Element => {
    const router = useRouter();

    const submitUserAccount = async (values: UserAccountFormSchemaType) => {
      try {
        const controller = CreateUserAccountController.getInstance();
        const success = await controller.createUserAccountController(
          values.email,
          values.password
        );

        if (success) {
          this.displaySuccessUI();
          router.push("/admin/view/user_account");
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
      }
    };

    return <CreateUserAccountForm submitUserAccount={submitUserAccount} />;
  };

  public displaySuccessUI() {
    toast.success("Successfully created user account", successToast);
  }

  public displayErrorUI() {
    toast.error("Failed to create user account", errorToast);
  }
}

export default CreateUserAccountUI;
