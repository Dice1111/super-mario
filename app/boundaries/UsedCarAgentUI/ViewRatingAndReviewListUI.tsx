import ReviewAndRatingList from "@/components/Lists/ReviewAndRating/ReviewAndRatingList";
import { ViewRatingAndReviewListController } from "@/controls/ReviewAndRatingControllers/ViewRatingAndReviewListController";
import { AgentReview } from "@prisma/client";
import { useSession } from "next-auth/react";

class ViewRatingAndReviewUI {
  private static instance: ViewRatingAndReviewUI;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): ViewRatingAndReviewUI {
    if (!ViewRatingAndReviewUI.instance) {
      ViewRatingAndReviewUI.instance = new ViewRatingAndReviewUI();
    }
    return ViewRatingAndReviewUI.instance;
  }

  // Method to display the review and rating UI
  public displayReviewAndRatingUI = (): JSX.Element => {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.email) {
      return <p>Failed to load session information</p>;
    }

    const agentEmail = session.user.email;

    const loadData = async (): Promise<AgentReview[]> => {
      const viewReviewController =
        ViewRatingAndReviewListController.getInstance();
      const loadData =
        await viewReviewController.viewRatingAndReviewListController(
          agentEmail
        );

      return loadData;
    };
    return <ReviewAndRatingList loadData={loadData} />;
  };

  public displaySuccessUI() {
    alert("Review and Rating Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Data Retrieval Failed");
  }
}

export default ViewRatingAndReviewUI;
