import { ViewRatingAndReviewListController } from "@/controls/UsedCarListingControllers/ViewRatingAndReviewListController";
import { AgentReview } from "@prisma/client";

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
  //   public displayReviewAndRatingUI = (): JSX.Element => {
  //     const loadData = async (): Promise<AgentReview[]> => {
  //       const controller = ViewRatingAndReviewListController.getInstance();
  //       try {
  //         const reviews = await controller.viewRatingAndReviewListController();
  //         this.displaySuccessUI();
  //         return reviews;
  //       } catch (error) {
  //         this.displayErrorUI();
  //         return [];
  //       }
  //     };

  //     return <ReviewAndRatingTable loadData={loadData} />;
  //   };

  public displaySuccessUI() {
    alert("Review and Rating Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Data Retrieval Failed");
  }
}

export default ViewRatingAndReviewUI;
