import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewShortlistController } from "@/controls/ShortlistControllers/ViewShortlistController";
import { errorToast, successToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

class ViewShortlistUI {
  private static instance: ViewShortlistUI;

  private constructor() {}

  public static getInstance(): ViewShortlistUI {
    if (!ViewShortlistUI.instance) {
      ViewShortlistUI.instance = new ViewShortlistUI();
    }
    return ViewShortlistUI.instance;
  }

  // Update here: id is now a string parameter
  public displayViewShortlistUI(email: string): JSX.Element {
    const loadData = async (): Promise<UsedCarListing[]> => {
      const viewShortlistController = ViewShortlistController.getInstance();
      const shortlists = await viewShortlistController.viewShortlistController(
        email
      );
      return shortlists;
    };
    loadData();
    return <CarListing loadData={loadData} />;
  }

  public displaySuccessUI() {
    toast.success("Shortlist Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Shortlist Data Retrieval Failed", errorToast);
  }
}

export default ViewShortlistUI;
