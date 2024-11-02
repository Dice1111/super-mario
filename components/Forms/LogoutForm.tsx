import React from "react";

interface LogoutFormProps {
  isLoading: boolean;
  handleLogout: () => Promise<void>;
}

const LogoutForm = ({ handleLogout, isLoading }: LogoutFormProps) => {
  return (
    <form>
      <button disabled={isLoading} onClick={handleLogout}>
        logout {isLoading ? "....." : ""}
      </button>
    </form>
  );
};

export default LogoutForm;
