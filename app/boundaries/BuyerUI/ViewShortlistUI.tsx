import CarListing from "@/components/Lists/CarListing/CarListing";
import { ViewShortlistController } from "@/controls/ShortlistControllers/ViewShortlistController";
import { Shortlist, UsedCarListing } from "@prisma/client";

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
    alert("Review and Rating Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Data Retrieval Failed");
  }
}

export default ViewShortlistUI;
