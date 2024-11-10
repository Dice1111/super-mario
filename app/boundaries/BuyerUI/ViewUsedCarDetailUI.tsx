import UsedCarDetail from "@/components/UsedCarDetail/UsedCarDetail";
import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

class ViewUsedCarDetailUI {
  private static instance: ViewUsedCarDetailUI;

  private constructor() {}

  public static getInstance(): ViewUsedCarDetailUI {
    if (!ViewUsedCarDetailUI.instance) {
      ViewUsedCarDetailUI.instance = new ViewUsedCarDetailUI();
    }
    return ViewUsedCarDetailUI.instance;
  }

  // Update here: id is now a string parameter
  public displayUsedCarDetailUI(car: UsedCarListing): JSX.Element {
    return <UsedCarDetail car={car} />;
  }

  public displaySuccessUI() {
    toast.success("Car Detail Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Car Detail Data Retrieval Failed", errorToast);
  }
}

export default ViewUsedCarDetailUI;
