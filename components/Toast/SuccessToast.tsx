import React from "react";

interface messageProps {
  message: string;
}

const SuccessToast = ({ message }: messageProps) => {
  return (
    <div className="toast">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default SuccessToast;
