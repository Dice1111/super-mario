import ReviewAndRatingList from "@/components/Lists/ReviewAndRating/ReviewAndRatingList";
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
  public displayReviewAndRatingUI = (): JSX.Element => {
    //   const loadData = async (): Promise<AgentReview[]> => {
    //     const controller = ViewRatingAndReviewListController.getInstance();
    //     try {
    //       const reviews = await controller.viewRatingAndReviewListController();
    //       this.displaySuccessUI();
    //       return reviews;
    //     } catch (error) {
    //       this.displayErrorUI();
    //       return [];
    //     }
    //   };

    const loadData = async (): Promise<AgentReview[]> => {
      return [
        {
          id: "ckxyz1234567890abcdef",
          agentEmail: "agent1@example.com",
          userEmail: "user1@example.com",
          comment: "The agent provided excellent service and was very helpful.",
          rating: 5,
          createdAt: new Date("2024-11-02T10:15:30.000Z"),
          updatedAt: new Date("2024-11-02T10:15:30.000Z"),
        },
        {
          id: "ckxyz1234567890abcdeg",
          agentEmail: "agent2@example.com",
          userEmail: "user2@example.com",
          comment: "Quick response and very polite.",
          rating: 4,
          createdAt: new Date("2024-11-02T10:15:30.000Z"),
          updatedAt: new Date("2024-11-02T10:15:30.000Z"),
        },
        {
          id: "ckxyz1234567890abcdeh",
          agentEmail: "agent3@example.com",
          userEmail: "user3@example.com",
          comment: "Helpful, but could improve on follow-up.",
          rating: 3,
          createdAt: new Date("2024-11-02T10:15:30.000Z"),
          updatedAt: new Date("2024-11-02T10:15:30.000Z"),
        },
        {
          id: "ckxyz1234567890abcdei",
          agentEmail: "agent4@example.com",
          userEmail: "user4@example.com",
          comment:
            "The agent was knowledgeable and resolved my issue efficiently.",
          rating: 5,
          createdAt: new Date("2024-11-02T10:15:30.000Z"),
          updatedAt: new Date("2024-11-02T10:15:30.000Z"),
        },
        {
          id: "ckxyz1234567890abcdej",
          agentEmail: "agent5@example.com",
          userEmail: "user5@example.com",
          comment: "Friendly agent but took a bit long to respond.",
          rating: 4,
          createdAt: new Date("2024-11-02T10:15:30.000Z"),
          updatedAt: new Date("2024-11-02T10:15:30.000Z"),
        },
      ];
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
