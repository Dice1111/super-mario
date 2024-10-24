"use client";

import React, { useEffect, useState } from "react";
import UserAccountEditModal from "../Modal/UserAccountEditModal";
import { createViewAccountControl } from "@/controls/services/viewUserAccountService";
import { User } from "@prisma/client";

const UserAccountTable = () => {
  const viewUserAccountsController = createViewAccountControl();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers =
          await viewUserAccountsController.viewUserAccountsController();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [viewUserAccountsController]);

  useEffect(() => {
    const modal = document.getElementById(
      "user_account_edit_modal"
    ) as HTMLDialogElement;
    if (modal) {
      if (selectedAccount) {
        modal.showModal();
      }
    }
  }, [selectedAccount]);
  return (
    <>
      <h1 className="ml-4 mt-10 font-bold text-lg">User Accounts</h1>

      {/* Search Box */}
      <div className="flex pt-10 pb-10 pl-4 text-slate-300">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow w-56" placeholder="Search" />
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
              <th>Created Date</th>
              <th>Updated Date</th>
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
                    onClick={() => setSelectedAccount(user)}
                  >
                    Details
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    defaultChecked
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Account */}
      {selectedAccount && <UserAccountEditModal data={selectedAccount} />}
    </>
  );
};

export default UserAccountTable;
