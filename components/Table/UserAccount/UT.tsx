"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";
import {
  createSuspendAccountControl,
  createViewAccountControl,
} from "@/controls/services/userAccountService";
import { Status, User } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import SuspendBoundary from "@/app/boundaries/SuspendBoundary";

async function getData(): Promise<User[]> {
  const viewUserAccountsController = createViewAccountControl();
  try {
    const data = await viewUserAccountsController.viewUserAccountsController();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<User[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchData = async () => {
    const users = await getData();
    setData(users);
  };

  const handleToggle = (user: User) => {
    setSelectedUser(user); // Set the user here, but the modal update will happen in useEffect
  };

  // Watch selectedUser changes to update the modal only after selectedUser is set
  useEffect(() => {
    if (selectedUser) {
      console.log("Selected User Updated:", selectedUser);
      setModal(
        SuspendBoundary.getInstance().displaySuspendBoundary({
          isOpen: true,
          onConfirm: handleConfirm,
          onCancel: handleCancel,
        })
      );
    }
  }, [selectedUser]); // Trigger the effect only when selectedUser changes

  const handleConfirm = async () => {
    console.log("Confirming for user:", selectedUser);
    if (selectedUser) {
      const newStatus =
        selectedUser.status === Status.active ? Status.inactive : Status.active;

      const userAccountController = createSuspendAccountControl();
      const result = await userAccountController.suspendUserAccountController(
        selectedUser.id,
        newStatus
      );

      if (result) {
        await fetchData();
        SuspendBoundary.getInstance().displaySuccessUI();
      } else {
        SuspendBoundary.getInstance().displayErrorUI();
      }
    }

    setModal(null); // Close the modal after confirmation
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setModal(null); // Close the modal on cancel
    setSelectedUser(null);
  };

  const columns: ColumnDef<User>[] = columnDefinitions.map((column) => {
    if (column.id === "switch") {
      return {
        ...column,
        cell: ({ row }) => {
          const isUserActive = row.original.status === Status.active;
          return (
            <Switch
              checked={isUserActive}
              onClick={() => handleToggle(row.original)}
            />
          );
        },
      };
    }
    return column;
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      {modal} {/* Render the modal here */}
    </div>
  );
}
