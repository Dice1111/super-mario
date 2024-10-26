import React from "react";

interface messageProps {
  message: string;
}
const ErrorToast = ({ message }: messageProps) => {
  return (
    <div className="toast">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorToast;
