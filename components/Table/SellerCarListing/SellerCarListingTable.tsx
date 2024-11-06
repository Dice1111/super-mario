"use client";

import { UsedCarListing } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
interface ViewSellerCarListingProps {
  loadData: () => Promise<UsedCarListing[]>;
}

export default function SellerCarListingTable({
  loadData,
}: ViewSellerCarListingProps) {
  const hasFetchedRef = useRef<boolean>(false);
  const [data, setData] = useState<UsedCarListing[]>([]);

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

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
