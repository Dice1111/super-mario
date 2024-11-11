"use client";

import React from "react";
import LoanCalculatorUI from "@/app/boundaries/BuyerUI/LoanCalculatorUI";

const LoanCalculatorPage = () => {
  // Get the instance and render the LoanCalculatorUI JSX element
  const boundary = LoanCalculatorUI.getInstance();

  return (
    <>
      <h1 className="text-2xl font-bold w-full text-center py-4">
        Loan Calculator
      </h1>
      {boundary.displayLoanCalculatorUI()}
    </>
  );
};

export default LoanCalculatorPage;
