import AddToShotListModal from "@/components/Modal/AddToShortListModal";
import { HandleShortlistController } from "@/controls/ShortlistControllers/HandleShortlistController";

import { errorToast, successToast } from "@/lib/utils";
import { toast } from "sonner";

class HandleShortlistUI {
  private static instance: HandleShortlistUI;

  private constructor() {}

  public static getInstance(): HandleShortlistUI {
    if (!HandleShortlistUI.instance) {
      HandleShortlistUI.instance = new HandleShortlistUI();
    }
    return HandleShortlistUI.instance;
  }

  public displayHandleShortlistUI = (
    fetchData: () => void,
    car_id: string
  ): JSX.Element => {
    const handleConfirm = async () => {
      const controller = HandleShortlistController.getInstance();
      const result = await controller.handleShortlistController(car_id);
      if (result) {
        this.displaySuccessUI();
      } else {
        this.displayErrorUI();
      }
      fetchData();
    };

    return <AddToShotListModal handleConfirm={handleConfirm} />;
  };

  public displaySuccessUI() {
    toast.success("Changes Saved to shortlist", successToast);
  }

  public displayErrorUI() {
    toast.error("Failed to save changes", errorToast);
  }
}

export default HandleShortlistUI;
