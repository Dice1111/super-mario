import CreateReviewForm from "@/components/Forms/CreateReviewForm";
import { CreateReviewAndRatingController } from "@/controls/ReviewAndRatingControllers/CreateReviewAndRatingController";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

class CreateReviewAndRatingUI {
  private static instance: CreateReviewAndRatingUI;

  private constructor() {}

  public static getInstance(): CreateReviewAndRatingUI {
    if (!CreateReviewAndRatingUI.instance) {
      CreateReviewAndRatingUI.instance = new CreateReviewAndRatingUI();
    }
    return CreateReviewAndRatingUI.instance;
  }

  public displayCreateReviewAndRatingUI(agentEmail: string): JSX.Element {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.email) {
      return <p>Failed to load session information</p>;
    }
    const userEmail = session.user.email;

    const addReview = async (
      comment: string,
      rating: number
    ): Promise<void> => {
      const createReviewController =
        CreateReviewAndRatingController.getInstance();

      const success =
        await createReviewController.CreateReviewAndRatingController(
          comment,
          rating,
          userEmail,
          agentEmail
        );

      if (success) {
        this.displaySuccessUI();
        router.refresh();
      } else {
        this.displayErrorUI();
      }
    };

    return <CreateReviewForm addReview={addReview} />;
  }

  public displaySuccessUI() {
    alert("Review and Rating Creation Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Creation Failed");
  }
}

export default CreateReviewAndRatingUI;
