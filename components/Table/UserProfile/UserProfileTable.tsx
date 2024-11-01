"use client";

import EditUserProfileUI from "@/app/boundaries/AdminUI/EditUserProfileUI";
import SuspendUserProfileUI from "@/app/boundaries/AdminUI/SuspendUserProfileUI";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Status, UserProfile } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";

interface ViewUserProfileProps {
  loadData: () => Promise<UserProfile[]>;
}

export default function UserProfileTable({ loadData }: ViewUserProfileProps) {
  const hasFetchedRef = useRef<boolean>(false); // Ref to track if fetch has occurred
  const [data, setData] = useState<UserProfile[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const fetchData = async () => {
    const users = await loadData();
    setModal(null);
    setData(users);
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchData();
      return () => {
        hasFetchedRef.current = true;
      };
    }
  }, []);

  const showSuspendModal = (selectedUserProfile: UserProfile) => {
    if (!modal) {
      const boundary = SuspendUserProfileUI.getInstance();
      const suspendModal = boundary.displaySuspendUserProfileUI(
        selectedUserProfile!,
        fetchData
      );
      setModal(suspendModal);
    }
  };

  const showEditModal = (selectedUserProfile: UserProfile) => {
    if (!modal) {
      const boundary = EditUserProfileUI.getInstance();
      const modal = boundary.displayEditUserProfileUI(
        selectedUserProfile!,
        fetchData
      );

      setModal(modal);
    }
  };

  const columns: ColumnDef<UserProfile>[] = columnDefinitions.map((column) => {
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
