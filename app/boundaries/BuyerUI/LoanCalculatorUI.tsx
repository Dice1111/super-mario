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

  public displaySuccessUI() {
    alert("Loan Calculator Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Loan Calculator Data Retrieval Failed");
  }
}

export default LoanCalculatorUI;
