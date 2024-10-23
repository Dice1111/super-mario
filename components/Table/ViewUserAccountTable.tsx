"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createViewAccountControl } from "@/controls/services/viewUserAccountService";
import React, { useState, useEffect } from "react";
import { User } from "@prisma/client";

const ViewUserAccountTable = () => {
  const viewUserAccountsController = createViewAccountControl();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data =
          await viewUserAccountsController.viewUserAccountsController();

        data.map((user) => {
          console.log(user);
        });

        if (data.length > 0) {
          setUsers(data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};

export default ViewUserAccountTable;
