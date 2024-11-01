"use client";

import EditUserAccountUI from "@/app/boundaries/AdminUI/EditUserAccountUI";
import SuspendUserAccountUI from "@/app/boundaries/AdminUI/SuspendUserAccountUI";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Status, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";

interface ViewUserAccountProps {
  loadData: () => Promise<User[]>;
}

export default function UserAccountTable({ loadData }: ViewUserAccountProps) {
  const hasFetchedRef = useRef<boolean>(false);
  const [data, setData] = useState<User[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const fetchData = async () => {
    const users = await loadData();
    setModal(null);
    setData(users);
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      console.log("yes");
      fetchData();
      return () => {
        hasFetchedRef.current = true;
      };
    }
  }, []);

  const showSuspendModal = (selectedUser: User) => {
    if (!modal) {
      const boundary = SuspendUserAccountUI.getInstance();
      const suspendModal = boundary.displaySuspendUserAccountUI(
        selectedUser!,
        fetchData
      );
      setModal(suspendModal);
    }
  };

  const showEditModal = (selectedUser: User) => {
    if (!modal) {
      const boundary = EditUserAccountUI.getInstance();
      const modal = boundary.displayEditUserAccountUI(selectedUser!, fetchData);

      setModal(modal);
    }
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
              onClick={() => showSuspendModal(row.original)}
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
            onClick={() => showEditModal(row.original)}
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
