"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { columns as columnDefinitions } from "./columns";
import { DataTable } from "./data-table";
interface ViewUsedCarAgentProfileProps {
  loadData: () => Promise<UserProfile[]>;
}

export default function UsedCarAgentProfileTable({
  loadData,
}: ViewUsedCarAgentProfileProps) {
  const router = useRouter(); // Initialize router
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
    const agentEmail = selectedProfile.userEmail;
    router.push(`/seller/view/agent_review/${agentEmail}`);
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
