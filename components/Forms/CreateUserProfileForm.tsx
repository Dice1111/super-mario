"use client";

import CreateUserProfileUI from "@/app/boundaries/AdminUI/CreateUserProfileUI";
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
import { createUserProfileControl } from "@/controls/services/userProfileServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, Status, UserProfile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  userEmail: z.string().email({ message: "Invalid email" }),
  role: z.enum([Role.admin, Role.agent, Role.buyer, Role.seller], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  address: z.string().nullable(),
  mobileNumber: z.string().nullable(),
});

interface CreateUserProfileFormProps {
  obj: CreateUserProfileUI;
}

const CreateUserProfileForm = ({ obj }: CreateUserProfileFormProps) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      userEmail: "",
      role: Role.buyer,
      address: "",
      mobileNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userProfile: UserProfile = {
      id: uuidv4(),
      name: values.name,
      userEmail: values.userEmail,
      role: values.role,
      updatedAt: new Date(),
      createdAt: new Date(),
      status: Status.active,
      address: values.address,
      mobileNumber: values.mobileNumber,
    };

    const createUserProfileController = createUserProfileControl();

    try {
      createUserProfileController
        .createUserProfileController(userProfile)
        .then((success: boolean) => {
          if (!success) {
            obj.displayErrorUI();
          } else {
            obj.displaySuccessUI();
            router.push("/admin/view/user_profile");
            form.reset();
          }
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        obj.displayErrorUI();
        console.error("Failed to create user:", error.message);
      }
    }
  }

  return (
    <div className="w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userEmail"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border p-2 rounded bg-white text-black"
                  >
                    {Object.values(Role).map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile Number" {...field} />
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

export default CreateUserProfileForm;
