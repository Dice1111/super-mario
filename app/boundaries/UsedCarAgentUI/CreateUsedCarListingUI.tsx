import { UsedCarListingFormSchemaType } from "@/components/Forms/UsedCarListingFormSchema";
import { CreateUsedCarListingController } from "@/controls/UsedCarListingControllers/CreateUsedCarListingController";
import { useRouter } from "next/navigation";
import CreateUsedCarListingForm from "@/components/Forms/CreateUsedCarListingForm";
import { successToast, errorToast } from "@/lib/utils";
import { toast } from "sonner";

class CreateUsedCarListingUI {
  private static instance: CreateUsedCarListingUI;
  private constructor() {}
  public static getInstance(): CreateUsedCarListingUI {
    if (!CreateUsedCarListingUI.instance) {
      CreateUsedCarListingUI.instance = new CreateUsedCarListingUI();
    }
    return CreateUsedCarListingUI.instance;
  }

  public displayCreateUsedCarListingUI = (): JSX.Element => {
    const router = useRouter();

    const submitUsedCarListing = async (
      values: UsedCarListingFormSchemaType
    ) => {
      try {
        const controller = CreateUsedCarListingController.getInstance();
        const success = await controller.createUsedCarListingController(
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
          router.push("/used_car_agent/view/used_car_listing");
        } else {
          this.displayErrorUI();
        }
      } catch (error) {
        this.displayErrorUI();
        console.error(error);
      }
    };

    return (
      <CreateUsedCarListingForm submitUsedCarListing={submitUsedCarListing} />
    );
  };

  public displaySuccessUI() {
    toast.success("Successfully created used car listing", successToast);
  }

  public displayErrorUI() {
    toast.error("Failed to create used car listing", errorToast);
  }
}

export default CreateUsedCarListingUI;
