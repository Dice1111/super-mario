// import ViewUserAccountUI from "@/app/boundaries/ViewUserBoundary";
// import UserProfileTable from "@/components/Table/UserProfileTable";
// import { notFound } from "next/navigation";
// import React from "react";

// interface Props {
//   params: { id: string };
// }

// enum PageType {
//   USER_ACCOUNT = "user_account",
//   USER_PROFILE = "user_profile",
// }

// const page = async ({ params }: Props) => {
//   // Await params to get the resolved value
//   const { id } = await params; // Ensure to await params

//   if (id === PageType.USER_ACCOUNT) {
//     const viewUserAccountUI = new ViewUserAccountUI();
//     return viewUserAccountUI.displayUserAccountsUI();
//   } else if (id === PageType.USER_PROFILE) {
//     return <UserProfileTable />;
//   } else {
//     notFound();
//   }
// };

// export default page;
