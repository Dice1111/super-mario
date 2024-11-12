import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserAccountFormSchema, {
  UserAccountFormSchemaType,
} from "./UserAccountFormSchema";

interface LoginFormProps {
  handleLogin: (values: UserAccountFormSchemaType) => Promise<void>;
}

const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const form = useForm({
    resolver: zodResolver(UserAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="text-white w-[300px] h-[300px] flex flex-col items-center justify-center space-y-4">
      <div className="text-2xl font-semibold">Login</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="space-y-6 w-full"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Email</FormLabel>
                <FormControl>
                  <Input
                    className="p-3 border-b border-gray-300 rounded-none bg-transparent text-white placeholder-white focus:border-white"
                    placeholder="Enter Your Email Address"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Password</FormLabel>
                <FormControl>
                  <Input
                    className="p-3 border-b border-gray-300 rounded-none bg-transparent text-white placeholder-white focus:border-white"
                    placeholder="Enter Your Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 rounded-none hover:bg-blue-600 transition"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
