import LoanCalculatorForm from "@/components/Forms/LoanCalculatorForm";

class LoanCalculatorUI {
  private static instance: LoanCalculatorUI;

  private constructor() {}

  public static getInstance(): LoanCalculatorUI {
    if (!LoanCalculatorUI.instance) {
      LoanCalculatorUI.instance = new LoanCalculatorUI();
    }
    return LoanCalculatorUI.instance;
  }

  public displayLoanCalculatorUI(): JSX.Element {
    return <LoanCalculatorForm />;
  }
}

export default LoanCalculatorUI;
