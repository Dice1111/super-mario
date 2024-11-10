import LogoutForm from "@/components/Forms/LogoutForm";
import { AuthControl } from "@/controls/AuthenticationControllers/AuthControl";
import { successToast, errorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

class UserLogoutUI {
  private static instance: UserLogoutUI;
  private constructor() {}
  public static getInstance(): UserLogoutUI {
    if (!UserLogoutUI.instance) {
      UserLogoutUI.instance = new UserLogoutUI();
    }
    return UserLogoutUI.instance;
  }

  public displayLogoutUI = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null as string | null);
    const handleLogout = async () => {
      setLoading(true);
      setError(null);
      const controller = AuthControl.getInstance();
      try {
        const success = await controller.logoutAccountController();

        if (success) {
          this.displaySuccessUI();
          router.refresh();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        setError("Logout failed. Please try again.");
        this.displayErrorUI();
      } finally {
        setLoading(false);
      }
    };
    return <LogoutForm handleLogout={handleLogout} isLoading={loading} />;
  };

  public displaySuccessUI() {
    toast.success("Logout Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Logout Failed", errorToast);
  }
}

export default UserLogoutUI;
