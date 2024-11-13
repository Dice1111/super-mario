"use client";

import HandleShortlistUI from "@/app/boundaries/BuyerUI/HandleShortlistUI";
import Card from "@/components/Card/Card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { UsedCarListing } from "@prisma/client";
import { useEffect, useState } from "react";

interface ViewUsedCarListingProps {
  loadData: (
    page: number,
    pageSize: number
  ) => Promise<{
    cars: UsedCarListing[];
    totalCount: number;
  }>;
  setNeedRefetch: (needRefetch: boolean) => void;
}

const CarListing = ({ loadData, setNeedRefetch }: ViewUsedCarListingProps) => {
  const [cars, setCars] = useState<UsedCarListing[] | null>(null);
  const [car_id, setCarID] = useState<string>("");
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch data for the current page
  const fetchData = () => {
    setNeedRefetch(true);
  };

  const syncPageChange = async () => {
    const { cars, totalCount } = await loadData(currentPage, pageSize);
    setCars(cars);
    setTotalCount(totalCount);
    setModal(null);
  };

  useEffect(() => {
    syncPageChange();
  }, [currentPage, loadData]); // Run the data fetch when currentPage changes

  // Handle modal and shortlist logic
  useEffect(() => {
    if (car_id) {
      const boundary = HandleShortlistUI.getInstance();
      const modal = boundary.displayHandleShortlistUI(fetchData, car_id);
      setModal(modal);
    }
  }, [openModal, car_id]); // Dependency on openModal and car_id to handle modal state

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update currentPage to trigger a refetch
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {cars && cars.length > 0 ? (
          <>
            {/* Display Cars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <Card
                  key={car.id}
                  car={car}
                  setCarID={() => setCarID(car.id)} // Set car_id when card is clicked
                  setOpenModal={() => setOpenModal(!openModal)} // Toggle modal visibility
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8">
              <Pagination
                aria-label="Page navigation"
                className="mx-auto flex justify-center"
              >
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1); // Prevent going below 1
                      }}
                    />
                  </PaginationItem>

                  {/* Page Number Links */}
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage} // Highlight active page
                          onClick={(e) => {
                            e.preventDefault();
                            if (page !== currentPage) handlePageChange(page); // Avoid unnecessary page change
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Show Ellipsis if there are more than 5 pages */}
                  {totalPages > 5 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1); // Prevent going above totalPages
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <p>No cars available.</p>
        )}
      </div>

      {/* Modal for Shortlist */}
      {modal}
    </>
  );
};

export default CarListing;
