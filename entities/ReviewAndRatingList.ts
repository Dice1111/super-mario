import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { baseUrl } from "@/lib/utils";
import { AgentReview, Status, User } from "@prisma/client";
import { signIn, signOut } from "next-auth/react";

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
