'use client'

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
import { createViewAccountControl } from '@/controls/services/viewUserAccountService'
import React, { useState, useEffect } from 'react'
import { User } from '@prisma/client'

const ViewUserAccountTable = () => {
  const viewUserAccountsController = createViewAccountControl()

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users =
          await viewUserAccountsController.viewUserAccountsController()

        setUsers(users)
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }

    fetchUsers()
  }, [viewUserAccountsController])

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}

export default ViewUserAccountTable
