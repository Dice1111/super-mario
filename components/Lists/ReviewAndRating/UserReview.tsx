import { AgentReview, Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

interface ReviewAndRatingListProps {
  agentEmail: string;
  loadData: () => Promise<AgentReview[]>;
  onAddReview: (comment: string, rating: number) => Promise<void>;
}

const ReviewAndRatingList = ({
  agentEmail,
  loadData,
  onAddReview,
}: ReviewAndRatingListProps) => {
  const { data: session } = useSession();
  const hasFetchedRef = useRef<boolean>(false);
  const [data, setData] = useState<AgentReview[]>([]);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);

  const fetchData = async () => {
    const fetch_data = await loadData();
    setData(fetch_data);
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchData();
      hasFetchedRef.current = true;
    }
  }, []);

  const handleAddReview = async () => {
    if (comment.trim()) {
      await onAddReview(comment, rating);
      setComment("");
      setRating(5);
      fetchData();
    }
  };

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

  return (
    <>
      <h1>User Reviews for {agentEmail}</h1>
      <br />

      {/* Only show the review input section if the user is logged in and not an admin */}
      {session && session.user.role !== Role.admin && (
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
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.map((review) => (
          <li
            key={review.id}
            style={{
              margin: "10px 0",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>{review.agentEmail}</h3>
            <p style={{ margin: "5px 0", fontWeight: "bold" }}>
              User: {review.userEmail}
            </p>
            <p style={{ margin: "5px 0" }}>
              Rating: {renderStars(review.rating)}
            </p>
            <p style={{ margin: "10px 0", fontStyle: "italic" }}>
              "{review.comment}"
            </p>
            <small style={{ color: "#777" }}>
              Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewAndRatingList;
