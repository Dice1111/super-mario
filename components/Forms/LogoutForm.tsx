import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";

interface LogoutFormProps {
  isLoading: boolean;
  handleLogout: () => Promise<void>;
}

const LogoutForm = ({ handleLogout, isLoading }: LogoutFormProps) => {
  return (
    <button
      className="w-full cursor-pointer hover:scale-110 transition-transform flex"
      disabled={isLoading}
      onClick={handleLogout}
    >
      <RiLogoutCircleRLine className="h-5 w-full" />
    </button>
  );
};

export default LogoutForm;
