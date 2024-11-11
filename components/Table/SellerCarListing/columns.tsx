import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsedCarListing } from "@prisma/client";

export const columns: ColumnDef<UsedCarListing>[] = [
  {
    id: "number",
    header: "#",
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
          ListingID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "viewCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          View Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("viewCount")}</div>
    ),
  },
  {
    accessorKey: "shortlistCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Shortlist Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("shortlistCount")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "agentEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Agent Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("agentEmail")}</div>
    ),
  },
  {
    accessorKey: "sellerEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Seller Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("sellerEmail")}</div>
    ),
  },
  {
    accessorKey: "mileage",
    header: () => <div className="text-center">Mileage</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("mileage")}</div>
    ),
  },
  {
    accessorKey: "color",
    header: () => <div className="text-center">Color</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("color")}</div>
    ),
  },
  {
    accessorKey: "condition",
    header: () => <div className="text-center">Condition</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("condition")}</div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: () => <div className="text-center">Image Url</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("imgUrl")}</div>
    ),
  },
  {
    accessorKey: "manufacturedYear",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Manufactured Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("manufacturedYear")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {new Date(row.original.createdAt).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Updated Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {new Date(row.original.updatedAt).toLocaleString()}
      </div>
    ),
  },
];
