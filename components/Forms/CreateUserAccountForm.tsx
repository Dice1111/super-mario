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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UserAccountFormSchema, {
  UserAccountFormSchemaType,
} from "./UserAccountFormSchema";

interface CreateUserAccountFormProps {
  submitUserAccount: (values: UserAccountFormSchemaType) => Promise<void>;
}

const CreateUserAccountForm = ({
  submitUserAccount,
}: CreateUserAccountFormProps) => {
  const form = useForm({
    resolver: zodResolver(UserAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-[300px]">
      <h1 className="font-bold text-2xl mb-5">Create User Account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitUserAccount)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateUserAccountForm;
