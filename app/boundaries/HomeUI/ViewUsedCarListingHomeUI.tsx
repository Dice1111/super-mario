import { useState, useEffect } from "react";
import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewUsedCarListingController";
import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

class ViewUsedCarListingHomeUI {
  private static instance: ViewUsedCarListingHomeUI;

  private constructor() {}

  public static getInstance(): ViewUsedCarListingHomeUI {
    if (!ViewUsedCarListingHomeUI.instance) {
      ViewUsedCarListingHomeUI.instance = new ViewUsedCarListingHomeUI();
    }
    return ViewUsedCarListingHomeUI.instance;
  }

  // Method to display the used car listing UI
  public displayViewUsedCarListingHomeUI = (): JSX.Element => {
    const [data, setData] = useState<UsedCarListing[] | null>(null);
    const [needRefetch, setNeedRefetch] = useState<boolean>(false);
    const retrieveAllData = async (): Promise<void> => {
      const controller = ViewUsedCarListingController.getInstance();
      try {
        const usedCarlisting = await controller.viewUsedCarListingController();

        if (usedCarlisting.length > 0) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
        setData(usedCarlisting);
      } catch (error) {
        console.error(error);
        this.displayErrorUI();
        setData([]);
      }
    };

    useEffect(() => {
      retrieveAllData();
    }, []);

    useEffect(() => {
      if (needRefetch) {
        retrieveAllData();
        setNeedRefetch(false);
      }
    }, [needRefetch]);

    // Function to load data based on pagination
    const loadData = async (page: number, pageSize: number) => {
      const offset = (page - 1) * pageSize;
      const cars = data!.slice(offset, offset + pageSize); // Slice the data for the current page
      const totalCount = data!.length; // Total number of cars available
      return { cars, totalCount };
    };

    return data ? (
      <CarListing loadData={loadData} setNeedRefetch={setNeedRefetch} />
    ) : (
      <p>Loading....</p>
    );
  };

  private displaySuccessUI() {
    toast.success("Car Data Retrieval Successful", successToast);
  }

  private displayErrorUI() {
    toast.error("Car Data Retrieval Failed", errorToast);
  }
}

export default ViewUsedCarListingHomeUI;
