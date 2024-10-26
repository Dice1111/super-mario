import React, { useEffect, useRef, useState } from "react";
import { Status, User } from "@prisma/client";
import SuspendUserAccountUI from "@/app/boundaries/AdminUI/SuspendUserAccountUI";
import EditUserAccountUI from "@/app/boundaries/AdminUI/EditUserAccountUI";
import ViewUserAccountUI from "@/app/boundaries/AdminUI/ViewUserAccountUI";
import { useRouter } from "next/navigation";
import {
  createViewAccountControl,
  createSearchAccountControl,
} from "@/controls/services/userAccountService";

interface ViewUserAccountProps {
  obj: ViewUserAccountUI;
}

const UserAccountTable = ({ obj }: ViewUserAccountProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const hasFetchedRef = useRef<boolean>(false);
  const router = useRouter();

  const viewUserAccountsController = createViewAccountControl();
  const fetchUsers = async () => {
    try {
      const data =
        await viewUserAccountsController.viewUserAccountsController();
      setUsers(data);
      obj.displaySucessUI();
    } catch (error) {
      console.error("Error fetching users:", error);
      obj.displayErrorUI();
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchUsers();
      hasFetchedRef.current = true;
    }
  }, []);

  useEffect(() => {
    const modalId =
      modal?.props.obj instanceof EditUserAccountUI
        ? "user_account_edit_modal"
        : modal?.props.obj instanceof SuspendUserAccountUI
        ? "user_account_suspend_modal"
        : null;

    if (modalId) {
      const dialog = document.getElementById(modalId) as HTMLDialogElement;
      dialog?.showModal();
      console.log("I am showing modal", modalId);
    }
  }, [modal]);

  function handleEditButton(user: User) {
    const editUserAccountUI = EditUserAccountUI.getInstance();
    const editModal = editUserAccountUI.displayEditUserAccountUI(user);
    console.log(modal);
    setModal(editModal);
  }

  function handleSuspenButton(user: User) {
    const suspendUserAccountUI = SuspendUserAccountUI.getInstance();
    const suspendModal = suspendUserAccountUI.displaySuspendUserAccountUI(user);
    console.log(modal);
    setModal(suspendModal);
  }

  async function handleSearchButton(data: string) {
    if (data) {
      const SearchUserAccountController = createSearchAccountControl();
      try {
        const searchResult: User | null =
          await SearchUserAccountController.SearchUserAccountController(data);

        if (searchResult) {
          setUsers([searchResult]);
        } else {
          alert("no user found");
          console.log(false);
        }
      } catch (error) {
        console.error("Error searching for user account:", error);
      }
    } else {
      alert("no user found");
      return;
    }
  }
  function handleCreateButton() {
    router.push("/auth/create_account/");
  }

  return (
    <>
      {console.log("final", users)}
      <h1 className="ml-4 mt-10 font-bold text-lg">User Accounts</h1>

      {/* Search Box */}
      <div className="flex pt-10 pb-10 pl-4 text-slate-300">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow w-56"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchButton(e.currentTarget.value);
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button
          onClick={handleCreateButton}
          className="btn btn-outline btn-success ml-10"
        >
          Create New Account
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-black">
            <tr>
              <th>No.</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleEditButton(user)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={user.status === Status.active}
                      onChange={() => handleSuspenButton(user)}
                    />
                    <span className="ml-2">
                      {user.status === Status.active
                        ? Status.active
                        : Status.inactive}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal}
    </>
  );
};

export default UserAccountTable;
