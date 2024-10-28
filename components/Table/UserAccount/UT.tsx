import ViewUserAccountUI from "@/app/boundaries/AdminUI/ViewUserAccountUI";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { createViewAccountControl } from "@/controls/services/userAccountService";
import { User } from "@prisma/client";

interface ViewUserAccountProps {
  obj: ViewUserAccountUI;
}

async function getData(): Promise<User[]> {
  // create controller obj
  const viewUserAccountsController = createViewAccountControl();

  try {
    const data = await viewUserAccountsController.viewUserAccountsController();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
