"use client";

import { Button } from "@/components/ui/button";
import { UsedCarListing, UserProfile } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";
interface ViewUsedCarAgentProfileProps {
  loadData: () => Promise<UserProfile[]>;
}

export default function UsedCarAgentProfileTable({
  loadData,
}: ViewUsedCarAgentProfileProps) {
  const hasFetchedRef = useRef<boolean>(false);
  const [data, setData] = useState<UserProfile[]>([]);

  const fetchData = async () => {
    const fetch_data = await loadData();
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

  const handleReivewButton = (selectedProfile: UserProfile) => {
    //add review section here
    //use router and call route
  };

  const columns: ColumnDef<UserProfile>[] = columnDefinitions.map((column) => {
    if (column.id === "review") {
      return {
        ...column,
        cell: ({ row }) => (
          <Button
            onClick={() => handleReivewButton(row.original)}
            className="rounded-lg"
          >
            See Review
          </Button>
        ),
      };
    }
    return column;
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
