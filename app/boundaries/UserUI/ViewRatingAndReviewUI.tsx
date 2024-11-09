import { ViewRatingAndReviewListController } from "@/controls/ReviewAndRatingControllers/ViewRatingAndReviewListController";
import { AgentReview } from "@prisma/client";

import ReviewAndRatingList from "@/components/Lists/ReviewAndRating/ReviewAndRatingList";

class ViewRatingAndReviewUI {
  private static instance: ViewRatingAndReviewUI;

  private constructor() {}

  public static getInstance(): ViewRatingAndReviewUI {
    if (!ViewRatingAndReviewUI.instance) {
      ViewRatingAndReviewUI.instance = new ViewRatingAndReviewUI();
    }
    return ViewRatingAndReviewUI.instance;
  }

  public displayRatingAndReviewUI(agentEmail: string): JSX.Element {
    const loadData = async (): Promise<AgentReview[]> => {
      const viewReviewController =
        ViewRatingAndReviewListController.getInstance();
      const loadData =
        await viewReviewController.viewRatingAndReviewListController(
          agentEmail
        );
      if (loadData.length > 0) {
        this.displaySuccessUI();
      } else {
        this.displayErrorUI();
      }

      return loadData;
    };

    return <ReviewAndRatingList loadData={loadData} />;
  }

  public displaySuccessUI() {
    alert("Review and Rating Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Data Retrieval Failed");
  }
}

export default ViewRatingAndReviewUI;
