"use client";

import LoginForm from "@/components/Forms/LoginForm";
import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { AuthControl } from "@/controls/AuthenticationControllers/AuthControl";
import { successToast, errorToast } from "@/lib/utils";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

class UserLoginUI {
  private static instance: UserLoginUI;

  private constructor() {}

  public static getInstance(): UserLoginUI {
    if (!UserLoginUI.instance) {
      UserLoginUI.instance = new UserLoginUI();
    }
    return UserLoginUI.instance;
  }

  public displayLoginUI = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
      if (session) {
        // Use switch-case to handle different user roles
        switch (session.user.role) {
          case Role.admin:
            router.push("/admin/");
            break;
          case Role.agent:
            router.push("/used_car_agent/");
            break;
          case Role.seller:
            router.push("/seller/");
            break;
          case Role.buyer:
            router.push("/");
            break;
          default:
            // If the role doesn't match any known role, you could handle it here or redirect to a default page
            router.push("/login");
        }
      }
    }, [session, router]);

    const handleLogin = async (values: UserAccountFormSchemaType) => {
      const controller = AuthControl.getInstance();

      try {
        const success = await controller.verifyAccount(
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
    };

    return <LoginForm handleLogin={handleLogin} />;
  };

  public displaySuccessUI() {
    toast.success("Login Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Login Failed", errorToast);
  }
}

export default UserLoginUI;
