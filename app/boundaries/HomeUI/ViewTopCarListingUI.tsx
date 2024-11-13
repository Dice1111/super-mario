import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewTopUsedCarListingController } from "@/controls/UsedCarListingControllers/ViewTopUsedCarListingController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

class ViewTopCarListingUI {
  private static instance: ViewTopCarListingUI;

  private constructor() {}

  public static getInstance(): ViewTopCarListingUI {
    if (!ViewTopCarListingUI.instance) {
      ViewTopCarListingUI.instance = new ViewTopCarListingUI();
    }
    return ViewTopCarListingUI.instance;
  }

  public displayViewTopCarListingUI = (): JSX.Element => {
    const [data, setData] = useState<UsedCarListing[] | null>(null);
    const [needRefetch, setNeedRefetch] = useState<boolean>(false);

    const retrieveAllData = async (): Promise<void> => {
      const controller = ViewTopUsedCarListingController.getInstance();
      try {
        const usedCarlisting =
          await controller.viewTopUsedCarListingController();
        this.displaySuccessUI();
        setData(usedCarlisting); // Store fetched data
      } catch (error) {
        console.error(error);
        this.displayErrorUI();
        setData([]); // Reset data on error
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

  public displaySuccessUI() {
    toast.success("Popular Car Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Popular Car Data Retrieval Failed", errorToast);
  }
}

export default ViewTopCarListingUI;
