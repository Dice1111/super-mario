import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@prisma/client";

export const columns: ColumnDef<UserProfile>[] = [
  {
    id: "number",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>, // Display row number
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Agent ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("userEmail")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">Address</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "mobileNumber",
    header: () => <div className="text-center">Mobile Number</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("mobileNumber")}</div>
    ),
  },
  {
    id: "review",
    header: () => <div>Review</div>,
  },
];
