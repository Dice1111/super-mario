// loanValidation.ts
import { z } from "zod";

// Define the Zod schema for form validation
const LoanCalculatorFormSchema = z.object({
  loanAmount: z
    .number()
    .min(1, { message: "Loan amount must be greater than 0" })
    .max(1000000000, { message: "Loan amount cannot exceed $1 billion" }),
  interestRate: z
    .number()
    .min(0.1, { message: "Interest rate must be at least 0.1%" })
    .max(100, { message: "Interest rate cannot exceed 100%" }),
  loanTerm: z
    .number()
    .min(1, { message: "Loan term must be at least 1 year" })
    .max(30, { message: "Loan term cannot exceed 30 years" }),
});

export default LoanCalculatorFormSchema;

export type LoanCalculatorFormSchemaType = z.infer<
  typeof LoanCalculatorFormSchema
>;
