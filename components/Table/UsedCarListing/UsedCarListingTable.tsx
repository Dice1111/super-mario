"use client";

import { ColumnDef } from "@tanstack/react-table";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";
import { UsedCarListing } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import DeleteUsedCarListingUI from "@/app/boundaries/UsedCarAgentUI/DeleteUsedCarListingUI";
import EditUsedCarListingUI from "@/app/boundaries/UsedCarAgentUI/EditUsedCarListingUI";

interface ViewUsedCarListingProps {
  loadData: () => Promise<UsedCarListing[]>;
}

export default function UsedCarlistingTable({
  loadData,
}: ViewUsedCarListingProps) {
  const hasFetchedRef = useRef<boolean>(false);
  const [data, setData] = useState<UsedCarListing[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const fetchData = async () => {
    const fetch_data = await loadData();
    setModal(null);
    setData(fetch_data);
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchData();
      return () => {
        hasFetchedRef.current = true;
      };
    }
  }, []);

  const showDeleteModal = (selectedList: UsedCarListing) => {
    if (!modal) {
      const boundary = DeleteUsedCarListingUI.getInstance();
      const modal = boundary.displayDeleteUsedCarListingUI(
        selectedList!,
        fetchData
      );
      setModal(modal);
    }
  };

  const showEditModal = (selectedList: UsedCarListing) => {
    if (!modal) {
      const boundary = EditUsedCarListingUI.getInstance();
      const modal = boundary.displayEditUsedCarListingUI(
        selectedList!,
        fetchData
      );

      setModal(modal);
    }
  };

  const columns: ColumnDef<UsedCarListing>[] = columnDefinitions.map(
    (column) => {
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
      if (column.id === "delete") {
        return {
          ...column,
          cell: ({ row }) => {
            return (
              <Button
                className="rounded-lg"
                onClick={() => showDeleteModal(row.original)}
              >
                Delete
              </Button>
            );
          },
        };
      }

      return column;
    }
  );

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      {modal}
    </div>
  );
}
