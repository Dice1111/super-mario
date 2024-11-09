import AddToShotListModal from "@/components/Modal/AddToShortListModal";
import { CreateShortlistController } from "@/controls/ShortlistControllers/CreateShortlistController";

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
    const handleCancel = () => {
      fetchData();
    };

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

    return (
      <AddToShotListModal
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    );
  }

  public displaySuccessUI() {
    alert("Review and Rating Creation Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Creation Failed");
  }
}

export default CreateShortlistUI;
