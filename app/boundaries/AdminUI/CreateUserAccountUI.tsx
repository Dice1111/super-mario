import Loading from "@/app/Loading";
import dynamic from "next/dynamic";
import React from "react";

class CreateUserAccountUI {
  private static instance: CreateUserAccountUI;
  private constructor() {}
  public static getInstance(): CreateUserAccountUI {
    if (!CreateUserAccountUI.instance) {
      CreateUserAccountUI.instance = new CreateUserAccountUI();
    }
    return CreateUserAccountUI.instance;
  }

  public displayCreateUserAccountUI() {
    const CreateUserAccountForm = dynamic(
      () => import("@/components/Forms/CreateUserAccountForm"),
      {
        ssr: false,
        loading: () => <Loading />,
      }
    );

    return <CreateUserAccountForm obj={this} />;
  }
  public displaySuccessUI() {
    alert("User Account Created Successfully");
  }

  public displayErrorUI() {
    alert("User Account Creation failed");
  }
}

export default CreateUserAccountUI;
