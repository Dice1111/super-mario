import { ViewRatingAndReviewListController } from "@/controls/ReviewAndRatingControllers/ViewRatingAndReviewListController";
import { AgentReview } from "@prisma/client";

import ReviewAndRatingList from "@/components/Lists/ReviewAndRating/ReviewAndRatingList";
import { successToast, errorToast } from "@/lib/utils";
import { toast } from "sonner";

class ViewRatingAndReviewUI {
  private static instance: ViewRatingAndReviewUI;

  private constructor() {}

  public static getInstance(): ViewRatingAndReviewUI {
    if (!ViewRatingAndReviewUI.instance) {
      ViewRatingAndReviewUI.instance = new ViewRatingAndReviewUI();
    }
    return ViewRatingAndReviewUI.instance;
  }

  public displayRatingAndReviewUI(email: string): JSX.Element {
    const loadData = async (): Promise<AgentReview[]> => {
      const viewReviewController =
        ViewRatingAndReviewListController.getInstance();
      const loadData =
        await viewReviewController.viewRatingAndReviewListController(email);
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
    toast.success("Review and Rating Data Retrieval Successful", successToast);
  }

  public displayErrorUI() {
    toast.error("Review and Rating Data Retrieval Failed", errorToast);
  }
}

export default ViewRatingAndReviewUI;
