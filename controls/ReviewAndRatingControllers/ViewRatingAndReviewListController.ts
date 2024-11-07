import { AgentReview } from "@prisma/client";
import { ReviewAndRatingEntity } from "../../entities/ReviewAndRatingList";


export class ViewRatingAndReviewListController {
  private static instance: ViewRatingAndReviewListController;
  private reviewAndRatingEntity: ReviewAndRatingEntity;


  private constructor(reviewAndRatingEntity: ReviewAndRatingEntity) {
    this.reviewAndRatingEntity = reviewAndRatingEntity;
  }


  public static getInstance(): ViewRatingAndReviewListController {
    if (!ViewRatingAndReviewListController.instance) {
      ViewRatingAndReviewListController.instance = new ViewRatingAndReviewListController(
        ReviewAndRatingEntity.getInstance()
      );
    }
    return ViewRatingAndReviewListController.instance;
  }


  public async viewRatingAndReviewListController(email:string): Promise<AgentReview[]> {
    const result = await this.reviewAndRatingEntity.viewSpecificReviewAndRatingEntity(email);
    return result;
  }
}