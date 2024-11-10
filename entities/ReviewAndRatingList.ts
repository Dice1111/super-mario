import { baseUrl } from "@/lib/utils";
import { AgentReview } from "@prisma/client";

export class ReviewAndRatingEntity {
  // Static property to hold the single instance of the class
  private static instance: ReviewAndRatingEntity;
  private reviews: AgentReview[] = [];
  private reviewsLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): ReviewAndRatingEntity {
    if (!ReviewAndRatingEntity.instance) {
      ReviewAndRatingEntity.instance = new ReviewAndRatingEntity();
    }
    return ReviewAndRatingEntity.instance;
  }

  public async getReviewAndRating(): Promise<AgentReview[]> {
    if (!this.reviewsLoaded) {
      await this.loadReviewAndRating();
    }
    return this.reviews;
  }

  public async viewReviewAndRatingEntity(): Promise<AgentReview[]> {
    const reviews = await this.getReviewAndRating();
    return reviews;
  }

  public async viewSpecificReviewAndRatingEntity(
    email: string
  ): Promise<AgentReview[]> {
    const reviews = await this.getReviewAndRating();
    const filteredReviews = reviews.filter(
      (review) => review.agentEmail === email || review.userEmail === email
    );
    console.log("filteredReviews:", filteredReviews);
    return filteredReviews;
  }

  public async createReviewAndRatingEntity(
    comment: string,
    rating: number,
    userEmail: string,
    agentEmail: string
  ): Promise<boolean> {
    try {
      const data = {
        comment,
        rating,
        userEmail,
        agentEmail,
      };

      const response = await fetch(`${baseUrl}/api/reviewAndRating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadReviewAndRating(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to create used car listing:", error);
      return false;
    }
  }

  private async loadReviewAndRating(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/reviewAndRating`, {
        cache: "no-cache",
      });
      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`);
        return;
      }

      const res = await response.json();

      this.reviews = res.reviews;

      this.reviewsLoaded = true;
    } catch (error) {
      console.error("Failed to load review and rating:", error);
    }
  }
}
