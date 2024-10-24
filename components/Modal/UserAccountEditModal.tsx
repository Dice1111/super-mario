import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@prisma/client";
import { createUpdateAccountControl } from "@/controls/services/updateUserAccountService";

interface EditUserAccountProps {
  data: User;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const UserAccountEditModal = ({ data }: EditUserAccountProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      password: data.password,
    },
  });

  const { reset, handleSubmit, register } = form;

  useEffect(() => {
    reset({ email: data.email, password: data.password });
  }, [data, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Updated Account:", data);

    try {
      const updateUserAccountController = createUpdateAccountControl();
      const result =
        await updateUserAccountController.updateUserAccountController(
          data.id,
          values.email,
          values.password
        );
      console.log("Account updated successfully:", result);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <dialog id="user_account_edit_modal" className="modal">
      <div className="modal-box text-slate-300">
        <form method="dialog">
          {/* Close button */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4">User Account Edit</h3>

          {/* Email field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Email
            <input
              {...register("email")}
              type="email"
              className="grow"
              placeholder="Enter email"
            />
          </label>

          {/* Password field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Password
            <input
              {...register("password")}
              type="password"
              className="grow"
              placeholder="Enter password"
            />
          </label>

          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default UserAccountEditModal;
