import { ReviewAndRatingEntity } from "../../entities/ReviewAndRatingList";

export class CreateReviewAndRatingController {
  private static instance: CreateReviewAndRatingController;
  private reviewAndRatingEntity: ReviewAndRatingEntity;

  private constructor(reviewAndRatingEntity: ReviewAndRatingEntity) {
    this.reviewAndRatingEntity = reviewAndRatingEntity;
  }

  public static getInstance(): CreateReviewAndRatingController {
    if (!CreateReviewAndRatingController.instance) {
      CreateReviewAndRatingController.instance = new CreateReviewAndRatingController(
        ReviewAndRatingEntity.getInstance()
      );
    }
    return CreateReviewAndRatingController.instance;
  }

  public async CreateReviewAndRatingController(
    comment: string,
    rating: number,
    userEmail: string,
    agentEmail: string
  ): Promise<boolean> {
    const success = await this.reviewAndRatingEntity.createReviewAndRatingEntity(
      comment,
      rating,
      userEmail,
      agentEmail
    )
    return success;
  }
}