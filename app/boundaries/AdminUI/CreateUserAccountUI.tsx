import CreateUserAccountForm from "@/components/Forms/CreateUserAccountForm";
import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { CreateUserAccountControllers } from "@/controls/Controllers/UserAccountContollers/CreateUserAccountController";
import { useRouter } from "next/navigation";

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
        const controller = CreateUserAccountControllers.getInstance();
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

  public displaySuccessUI(): void {
    alert("Successfully created user account");
  }

  public displayErrorUI(): void {
    alert("Failed to create user account");
  }
}

export default CreateUserAccountUI;
