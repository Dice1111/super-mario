import { UsedCarListingFormSchemaType } from "@/components/Forms/UsedCarListingFormSchema";
import { UsedCarListingEditModal } from "@/components/Modal/UsedCarListingEditModal";
import { EditUsedCarListingController } from "@/controls/UsedCarListingControllers/EditUsedCarListingController";
import { successToast, errorToast } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";
import { toast } from "sonner";

class EditUsedCarListingUI {
  private static instance: EditUsedCarListingUI;
  private constructor() {}

  public static getInstance(): EditUsedCarListingUI {
    if (!EditUsedCarListingUI.instance) {
      EditUsedCarListingUI.instance = new EditUsedCarListingUI();
    }
    return EditUsedCarListingUI.instance;
  }

  public displayEditUsedCarListingUI = (
    selectedUsedCarListing: UsedCarListing,
    fetchData: () => Promise<void>
  ): JSX.Element => {
    const submitEditUsedCarListing = async (
      values: UsedCarListingFormSchemaType
    ) => {
      try {
        const controller = EditUsedCarListingController.getInstance();
        const success = await controller.editUsedCarListingController(
          selectedUsedCarListing.id,
          values.title,
          values.agentEmail,
          values.sellerEmail,
          values.mileage,
          values.color,
          values.condition,
          values.imgUrl,
          values.manufacturedYear,
          values.price,
          values.description
        );

        if (success) {
          this.displaySuccessUI();
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
      }
      await fetchData();
    };
    const handleCancel = async () => {
      await fetchData();
    };

    return (
      <UsedCarListingEditModal
        selectedUsedCarListing={selectedUsedCarListing}
        submitEditUsedCarListing={submitEditUsedCarListing}
        handleCancel={handleCancel}
      />
    );
  };

  public displaySuccessUI() {
    toast.success("Used Car Listing Updated Successfully", successToast);
  }

  public displayErrorUI() {
    toast.error("Used Car Listing Update Failed", errorToast);
  }
}

export default EditUsedCarListingUI;
