import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoanCalculatorFormSchema, {
  LoanCalculatorFormSchemaType,
} from "./LoanCalculatorSchema";
import { Input } from "@/components/ui/input"; // Assuming this is your custom Input component
import { Button } from "@/components/ui/button"; // Assuming this is your custom Button component
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form"; // Assuming these are custom form components

const LoanCalculatorForm = () => {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  // Initialize the form with validation
  const form = useForm<LoanCalculatorFormSchemaType>({
    resolver: zodResolver(LoanCalculatorFormSchema),
    defaultValues: {
      loanAmount: 0,
      interestRate: 0,
      loanTerm: 0,
    },
  });

  // Form submit handler to calculate the loan payment
  const onSubmit: SubmitHandler<LoanCalculatorFormSchemaType> = (data) => {
    const { loanAmount, interestRate, loanTerm } = data;

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const payment =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
  };

  return (
    <div className="w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Loan Amount Field */}
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Loan Amount"
                    {...form.register("loanAmount", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interest Rate Field */}
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Interest Rate"
                    {...form.register("interestRate", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Loan Term Field */}
          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Term (Years)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Loan Term"
                    {...form.register("loanTerm", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Calculate Monthly Payment</Button>
        </form>
      </Form>
      {/* Display the result if available */}
      {monthlyPayment !== null && (
        <div className="mt-4">
          <h3>Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default LoanCalculatorForm;
