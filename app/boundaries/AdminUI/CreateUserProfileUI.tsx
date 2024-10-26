import Loading from "@/app/Loading";
import CreateUserProfileForm from "@/components/Forms/CreateUserProfileForm";
import dynamic from "next/dynamic";
import React from "react";

class CreateUserProfileUI {
  private static instance: CreateUserProfileUI;
  private constructor() {}
  public static getInstance(): CreateUserProfileUI {
    if (!CreateUserProfileUI.instance) {
      CreateUserProfileUI.instance = new CreateUserProfileUI();
    }
    return CreateUserProfileUI.instance;
  }

  public displayCreateUserProfileUI() {
    const CreateUserProfileForm = dynamic(
      () => import("@/components/Forms/CreateUserProfileForm"),
      {
        ssr: false,
        loading: () => <Loading />,
      }
    );

    return <CreateUserProfileForm obj={this} />;
  }
  public displaySuccessUI() {
    alert("User Profile Created Successfully");
  }

  public displayErrorUI() {
    alert("User Profile Creation Failed");
  }
}

export default CreateUserProfileUI;
