import React from "react";

interface LogoutFormProps {
  isLoading: boolean;
  handleLogout: () => Promise<void>;
}

const LogoutForm = ({ handleLogout, isLoading }: LogoutFormProps) => {
  return (
    <form className="w-full flex justify-center">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleLogout}
        className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition-colors
                  ${isLoading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"} 
                  disabled:opacity-50`}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
};

export default LogoutForm;
