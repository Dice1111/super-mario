import Loading from "@/app/Loading";
import dynamic from "next/dynamic";

class UserLoginUI {
  private static instance: UserLoginUI;
  private constructor() {}
  public static getInstance(): UserLoginUI {
    if (!UserLoginUI.instance) {
      UserLoginUI.instance = new UserLoginUI();
    }
    return UserLoginUI.instance;
  }

  public displayLoginUI() {
    const LoginForm = dynamic(() => import("@/components/Forms/LoginForm"), {
      ssr: false,
      loading: () => <Loading />,
    });

    return <LoginForm obj={this} />;
  }
  public displaySuccessUI() {
    alert("Login Successful");
  }

  public displayErrorUI() {
    alert("Login failed");
  }
}

export default UserLoginUI;
