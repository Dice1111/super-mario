"use client";

import UserSignupUI from "@/app/boundaries/AdminUI/CreateUserAccountUI";
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
import { Status, User } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

interface CreateUserAccountFormProps {
  obj: UserSignupUI;
}

import { createUserAccountControl } from "@/controls/services/userAccountService";

const CreateUserAccountForm = ({ obj }: CreateUserAccountFormProps) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user: User = {
      email: values.email,
      password: values.password,
      id: uuidv4(),
      updatedAt: new Date(),
      createdAt: new Date(),
      status: Status.active,
    };
    const createUserAccountController = createUserAccountControl();

    try {
      createUserAccountController
        .createUserAccountController(user)
        .then((success: boolean) => {
          if (!success) {
            obj.displayErrorUI();
          } else {
            obj.displaySuccessUI();
            router.push("/admin/view/user_account");
            form.reset();
          }
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        obj.displayErrorUI();
        console.error("Failed to create user:", error.context);
      }
    }
  }

  return (
    <div className="w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
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
