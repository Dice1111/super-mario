"use client";

import { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";
import {
  createEditAccountControl,
  createSuspendAccountControl,
  createViewAccountControl,
} from "@/controls/services/userAccountService";
import { Status, User } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SuspendUserAccountUI from "@/app/boundaries/AdminUI/SuspendUserAccountUI";
import EditUserAccountUI from "@/app/boundaries/AdminUI/EditUserAccountUI";
import ViewUserAccountUI from "@/app/boundaries/AdminUI/ViewUserAccountUI";

interface ViewUserAccountProps {
  obj: ViewUserAccountUI;
}

async function getData(obj: ViewUserAccountUI): Promise<User[]> {
  const viewUserAccountsController = createViewAccountControl();
  try {
    const data = await viewUserAccountsController.viewUserAccountsController();
    obj.displaySucessUI();
    return data;
  } catch (error) {
    obj.displayErrorUI();
    return [];
  }
}

export default function UserAccountTable({ obj }: ViewUserAccountProps) {
  const hasFetchedRef = useRef<boolean>(false); // Ref to track if fetch has occurred
  const [data, setData] = useState<User[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toggleType, setToggleType] = useState<"suspend" | "edit" | null>(null);

  const fetchData = async () => {
    const users = await getData(obj);

    setData(users);
  };

  const handleStatusToggle = (user: User) => {
    setSelectedUser(user);
    setToggleType("suspend");
  };

  const handleEditToggle = (user: User) => {
    setSelectedUser(user);
    setToggleType("edit");
  };

  useEffect(() => {
    if (selectedUser && toggleType) {
      if (toggleType === "suspend") {
        setModal(
          SuspendUserAccountUI.getInstance().displaySuspendUserAccountUI({
            isOpen: true,
            onConfirm: handleConfirm,
            onCancel: handleCancel,
          })
        );
      } else if (toggleType === "edit") {
        setModal(
          EditUserAccountUI.getInstance().displayEditUserAccountUI({
            isOpen: true,
            initialEmail: selectedUser.email, // Pass the email
            initialPassword: selectedUser.password, // Pass the password
            onConfirm: (email: string, password: string) =>
              handleConfirm(email, password),
            onCancel: handleCancel,
          })
        );
      }
    }
  }, [selectedUser, toggleType]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      console.log("yes");
      fetchData();
      return () => {
        hasFetchedRef.current = true;
      };
    }
  }, []);

  const handleConfirm = async (email?: string, password?: string) => {
    if (toggleType === "suspend" && selectedUser) {
      const newStatus =
        selectedUser.status === Status.active ? Status.inactive : Status.active;

      const userAccountController = createSuspendAccountControl();
      const result = await userAccountController.suspendUserAccountController(
        selectedUser.id,
        newStatus
      );

      if (result) {
        SuspendUserAccountUI.getInstance().displaySuccessUI();
        await fetchData();
      } else {
        SuspendUserAccountUI.getInstance().displayErrorUI();
      }
    } else if (toggleType === "edit" && selectedUser && email && password) {
      const userAccountController = createEditAccountControl();
      const result = await userAccountController.editUserAccountController(
        selectedUser.id,
        email,
        password
      );

      if (result) {
        EditUserAccountUI.getInstance().displaySuccessUI();
        await fetchData();
      } else {
        EditUserAccountUI.getInstance().displayErrorUI();
      }
    }

    setModal(null);
    setSelectedUser(null);
    setToggleType(null);
  };

  const handleCancel = () => {
    setModal(null);
    setSelectedUser(null);
    setToggleType(null);
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
              onClick={() => handleStatusToggle(row.original)}
            />
          );
        },
      };
    }

    if (column.id === "edit") {
      return {
        ...column,
        cell: ({ row }) => (
          <Button
            className="rounded-lg"
            onClick={() => handleEditToggle(row.original)}
          >
            Edit
          </Button>
        ),
      };
    }
    return column;
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      {modal}
    </div>
  );
}
