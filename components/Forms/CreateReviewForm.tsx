import React, { useState } from "react";

interface ReviewAndRatingListProps {
  addReview: (comment: string, rating: number) => Promise<void>;
}

const CreateReviewForm = ({ addReview }: ReviewAndRatingListProps) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i + 1)}
          style={{
            color: i < rating ? "#FFD700" : "#ddd",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleAddReview = async () => {
    if (comment.trim()) {
      await addReview(comment, rating);
      setComment("");
      setRating(5);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Write a Review</h3>
      <div style={{ marginBottom: "10px" }}>{renderStars(rating)}</div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Write your review here..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          resize: "none",
        }}
      />
      <button
        onClick={handleAddReview}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>
    </div>
  );
};

export default CreateReviewForm;
