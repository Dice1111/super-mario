import AddToShotListModal from "@/components/Modal/AddToShortListModal";
import { CreateShortlistController } from "@/controls/ShortlistControllers/CreateShortlistController";
import { errorToast, successToast } from "@/lib/utils";
import { toast } from "sonner";

class CreateShortlistUI {
  private static instance: CreateShortlistUI;

  private constructor() {}

  public static getInstance(): CreateShortlistUI {
    if (!CreateShortlistUI.instance) {
      CreateShortlistUI.instance = new CreateShortlistUI();
    }
    return CreateShortlistUI.instance;
  }

  public displayCreateShortlistUI(
    fetchData: () => void,
    car_id: string,
    userEmail: string
  ): JSX.Element {
    const handleConfirm = async () => {
      const createShortlistController = CreateShortlistController.getInstance();
      const result = await createShortlistController.createShortlistController(
        car_id,
        userEmail
      );
      if (result) {
        this.displaySuccessUI();
      } else {
        this.displayErrorUI();
      }
      fetchData();
    };

    return <AddToShotListModal handleConfirm={handleConfirm} />;
  }

  public displaySuccessUI() {
    toast.success("Shortlist has been made successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("Failed to add Shortlist", errorToast);
  }
}

export default CreateShortlistUI;
