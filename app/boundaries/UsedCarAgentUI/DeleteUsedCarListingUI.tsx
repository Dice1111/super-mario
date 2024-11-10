import UsedCarListingDeleteModal from "@/components/Modal/UsedCarListingDeleteModal";
import { DeleteUsedCarListingController } from "@/controls/UsedCarListingControllers/DeleteUsedCarListingController";
import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

class DeleteUsedCarListingUI {
  private static instance: DeleteUsedCarListingUI;
  private constructor() {}

  public static getInstance(): DeleteUsedCarListingUI {
    if (!DeleteUsedCarListingUI.instance) {
      DeleteUsedCarListingUI.instance = new DeleteUsedCarListingUI();
    }
    return DeleteUsedCarListingUI.instance;
  }

  public displayDeleteUsedCarListingUI = (
    selectedUsedCarListing: UsedCarListing,
    fetchData: () => Promise<void>
  ): JSX.Element => {
    const handleConfirm = async () => {
      const controller = DeleteUsedCarListingController.getInstance();

      try {
        const success = await controller.deleteUsedCarListingController(
          selectedUsedCarListing.id
        );
        if (success) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
      }
      await fetchData();
    };

    const handleCancel = async () => {
      await fetchData();
    };

    return (
      <UsedCarListingDeleteModal
        selectedUsedCarListing={selectedUsedCarListing}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    );
  };

  public displaySuccessUI() {
    toast.success("Used Car Listing Deleted Successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("Used Car Listing Deletion Failed", errorToast);
  }
}

export default DeleteUsedCarListingUI;
