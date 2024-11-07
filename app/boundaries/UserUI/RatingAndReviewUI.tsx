import UserReview from "@/components/Lists/ReviewAndRating/UserReview";
import { CreateReviewAndRatingController } from "@/controls/ReviewAndRatingControllers/CreateReviewAndRatingController";
import { ViewRatingAndReviewListController } from "@/controls/ReviewAndRatingControllers/ViewRatingAndReviewListController";
import { AgentReview } from "@prisma/client";
import { useSession } from "next-auth/react";

class RatingAndReviewUI {
  private static instance: RatingAndReviewUI;

  private constructor() {}

  public static getInstance(): RatingAndReviewUI {
    if (!RatingAndReviewUI.instance) {
      RatingAndReviewUI.instance = new RatingAndReviewUI();
    }
    return RatingAndReviewUI.instance;
  }

  // Update here: id is now a string parameter
  public displayRatingAndReviewUI(agentEmail: string): JSX.Element {
    // Conditional rendering to ensure session data is available
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.email) {
      return <p>Failed to load session information</p>;
    }

    const userEmail = session.user.email;
    const loadData = async (): Promise<AgentReview[]> => {
      const viewReviewController =
        ViewRatingAndReviewListController.getInstance();
      const loadData =
        await viewReviewController.viewRatingAndReviewListController(
          agentEmail
        );

      return loadData;
    };

    const addReview = async (
      comment: string,
      rating: number
    ): Promise<void> => {
      const createReviewController =
        CreateReviewAndRatingController.getInstance();

      await createReviewController.CreateReviewAndRatingController(
        comment,
        rating,
        userEmail,
        agentEmail
      );
    };

    return (
      <UserReview
        agentEmail={agentEmail}
        loadData={loadData}
        onAddReview={addReview}
      />
    );
  }

  public displaySuccessUI() {
    alert("Review and Rating Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Data Retrieval Failed");
  }
}

export default RatingAndReviewUI;
