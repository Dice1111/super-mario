import { AgentReview } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";

interface ReviewAndRatingListProps {
  loadData: () => Promise<AgentReview[]>;
}

const ReviewAndRatingList = ({ loadData }: ReviewAndRatingListProps) => {
  const hasFetchedRef = useRef<boolean>(false);
  const [data, setData] = useState<AgentReview[]>([]);

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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#ddd" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
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
              &quot{review.comment}&quot
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
