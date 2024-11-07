"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (title: string) => void;
}

export default function BuyerSearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-4">Explore.</h1>
        <form
          onSubmit={handleSearch}
          className=" flex items-center justify-center p-4"
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for car"
            className="px-4 py-2 w-full max-w-xs border rounded-md"
          />
          <Button
            type="submit"
            className="px-4 py-2 ml-2 bg-red-500 text-white rounded-md"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
