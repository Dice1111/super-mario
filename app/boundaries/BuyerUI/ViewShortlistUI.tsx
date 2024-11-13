import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewShortlistController } from "@/controls/ShortlistControllers/ViewShortlistController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SearchBuyerShortlistUI from "./SearchBuyerShortlistUI";

class ViewShortlistUI {
  private static instance: ViewShortlistUI;

  private constructor() {}

  public static getInstance(): ViewShortlistUI {
    if (!ViewShortlistUI.instance) {
      ViewShortlistUI.instance = new ViewShortlistUI();
    }
    return ViewShortlistUI.instance;
  }

  public displayViewShortlistUI = (): JSX.Element => {
    const [showData, setShowData] = useState<UsedCarListing[] | null>(null);
    const [data, setData] = useState<UsedCarListing[] | null>(null);
    const [needRefetch, setNeedRefetch] = useState<boolean>(false);

    const retrieveAllData = async (): Promise<void> => {
      const viewShortlistController = ViewShortlistController.getInstance();

      try {
        const shortlists =
          await viewShortlistController.viewShortlistController();
        if (shortlists.length > 0) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
        setData(shortlists); // Store all shortlisted data
      } catch (error) {
        console.error(error);
        setData([]); // Reset on error
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
      const dataToDisplay = showData ?? data;
      const totalCount = dataToDisplay!.length;
      const offset = (page - 1) * pageSize;
      const cars = dataToDisplay!.slice(offset, offset + pageSize);
      return { cars, totalCount };
    };

    return (
      <>
        {/* Render SearchBuyerShortlistUI to filter or search the shortlisted data */}
        {SearchBuyerShortlistUI.getInstance().displaySearchBuyerShortlistUI(
          setShowData,
          needRefetch,
          setNeedRefetch
        )}

        {/* Render CarListing with the paginated data */}
        {data || showData ? (
          <CarListing loadData={loadData} setNeedRefetch={setNeedRefetch} />
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  };

  public displaySuccessUI() {
    toast.success("Shortlist Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Shortlist Data Retrieval Failed", errorToast);
  }
}

export default ViewShortlistUI;
