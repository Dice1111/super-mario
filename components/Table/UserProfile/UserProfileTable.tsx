"use client";

import { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";
import { Role, Status, UserProfile } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ViewUserProfileUI from "@/app/boundaries/AdminUI/ViewUserProfileUI";
import SuspendUserProfileUI from "@/app/boundaries/AdminUI/SuspendUserProfileUI";
import EditUserProfileUI from "@/app/boundaries/AdminUI/EditUserProfileUI";
import {
  createEditProfileControl,
  createSuspendProfileControl,
  createViewProfileControl,
} from "@/controls/services/userProfileServices";

interface ViewUserProfileProps {
  obj: ViewUserProfileUI;
}

async function getData(obj: ViewUserProfileUI): Promise<UserProfile[]> {
  const viewUserProfilesController = createViewProfileControl();
  try {
    const data = await viewUserProfilesController.viewUserProfileController();
    console.log(data);
    obj.displaySucessUI();
    return data;
  } catch (error) {
    obj.displayErrorUI();
    return [];
  }
}

export default function UserProfileTable({ obj }: ViewUserProfileProps) {
  const hasFetchedRef = useRef<boolean>(false); // Ref to track if fetch has occurred
  const [data, setData] = useState<UserProfile[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const [selectedUserProfile, setSelectedUser] = useState<UserProfile | null>(
    null
  );
  const [toggleType, setToggleType] = useState<"suspend" | "edit" | null>(null);

  const fetchData = async () => {
    const users = await getData(obj);

    setData(users);
  };

  const handleStatusToggle = (userProfile: UserProfile) => {
    setSelectedUser(userProfile);
    setToggleType("suspend");
  };

  const handleEditToggle = (userProfile: UserProfile) => {
    setSelectedUser(userProfile);
    setToggleType("edit");
  };

  useEffect(() => {
    if (selectedUserProfile && toggleType) {
      if (toggleType === "suspend") {
        setModal(
          SuspendUserProfileUI.getInstance().displaySuspendUserProfileUI({
            isOpen: true,
            onConfirm: handleConfirm,
            onCancel: handleCancel,
          })
        );
      } else if (toggleType === "edit") {
        setModal(
          EditUserProfileUI.getInstance().displayEditUserProfileUI({
            isOpen: true,
            initialName: selectedUserProfile.name,
            initialAddress: selectedUserProfile.address,
            initialMobileNumber: selectedUserProfile.mobileNumber,
            initialRole: selectedUserProfile.role,
            onConfirm: (
              name: string,
              address: string,
              mobileNumber: string,
              role: Role
            ) => handleConfirm(name, address, mobileNumber, role),
            onCancel: handleCancel,
          })
        );
      }
    }
  }, [selectedUserProfile, toggleType]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      console.log("yes");
      fetchData();
      return () => {
        hasFetchedRef.current = true;
      };
    }
  }, []);

  const handleConfirm = async (
    name?: string,
    address?: string,
    mobileNumber?: string,
    role?: Role
  ) => {
    if (toggleType === "suspend" && selectedUserProfile) {
      const newStatus =
        selectedUserProfile.status === Status.active
          ? Status.inactive
          : Status.active;

      const suspendUserProfileController = createSuspendProfileControl();
      const result =
        await suspendUserProfileController.suspendUserProfileController(
          selectedUserProfile.id,
          newStatus
        );

      if (result) {
        SuspendUserProfileUI.getInstance().displaySuccessUI();
        await fetchData();
      } else {
        SuspendUserProfileUI.getInstance().displayErrorUI();
      }
    } else if (
      toggleType === "edit" &&
      selectedUserProfile &&
      name &&
      address &&
      mobileNumber &&
      role
    ) {
      const editUserProfileController = createEditProfileControl();
      const result = await editUserProfileController.editUserProfileController(
        selectedUserProfile.id,
        name,
        role,
        address,
        mobileNumber
      );

      if (result) {
        EditUserProfileUI.getInstance().displaySuccessUI();
        await fetchData();
      } else {
        EditUserProfileUI.getInstance().displayErrorUI();
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

  const columns: ColumnDef<UserProfile>[] = columnDefinitions.map((column) => {
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
