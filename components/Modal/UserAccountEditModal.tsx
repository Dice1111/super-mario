import EditUserAccountUI from "@/app/boundaries/AdminUI/EditUserAccountUI";
import { createEditAccountControl } from "@/controls/services/userAccountService";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditUserAccountProps {
  data: User;
  obj: EditUserAccountUI;
}
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
export default function UserAccountEditModal({
  data,
  obj,
}: EditUserAccountProps) {
  const router = useRouter();
  const modal = document.getElementById(
    "user_account_edit_modal"
  ) as HTMLDialogElement;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      password: data.password,
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  // Reset form values when props change
  useEffect(() => {
    reset({
      email: data.email,
      password: data.password,
    });
  }, [data, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Updated Account:", data);
    console.log("Updated value:", values);

    try {
      const editUserAccountController = createEditAccountControl();
      const result = await editUserAccountController.editUserAccountController(
        data.id,
        values.email,
        values.password
      );
      if (result) {
        obj.displaySucessUI();
        modal.close();
        router.refresh();
      } else {
        obj.displayErrorUI();
      }
    } catch (error) {
      obj.displayErrorUI();
    }
  };

  return (
    <dialog id="user_account_edit_modal" className="modal">
      <div className="modal-box text-slate-300">
        <form method="dialog">
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
              className={`grow ${errors.email ? "input-error" : ""}`}
              placeholder="Enter email"
            />
          </label>
          {errors.email && <p className="text-error">{errors.email.message}</p>}

          {/* Password field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Password
            <input
              {...register("password")}
              type="password"
              className={`grow ${errors.password ? "input-error" : ""}`}
              placeholder="Enter password"
            />
          </label>
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}

          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
}
