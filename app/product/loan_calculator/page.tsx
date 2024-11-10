"use client";

import React from "react";
import LoanCalculatorUI from "@/app/boundaries/BuyerUI/LoanCalculatorUI";

const LoanCalculatorPage = () => {
  // Get the instance and render the LoanCalculatorUI JSX element
  const boundary = LoanCalculatorUI.getInstance();

  return <>{boundary.displayLoanCalculatorUI()}</>;
};

export default LoanCalculatorPage;
