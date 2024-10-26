import EditUserProfileUI from "@/app/boundaries/AdminUI/EditUserProfileUI";
import { createEditProfileControl } from "@/controls/services/userProfileServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, UserProfile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditUserProfileProps {
  data: UserProfile;
  obj: EditUserProfileUI;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.enum([Role.admin, Role.agent, Role.buyer, Role.seller], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  address: z.string().nullable(),
  mobileNum: z.string().nullable(),
});

export default function UserAccountEditModal({
  data,
  obj,
}: EditUserProfileProps) {
  const router = useRouter();

  const modal = document.getElementById(
    "user_profile_edit_modal"
  ) as HTMLDialogElement;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      role: data.role,
      address: data.address || "",
      mobileNum: data.mobileNumber || "",
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    reset({
      name: data.name,
      role: data.role,
      address: data.address || "",
      mobileNum: data.mobileNumber || "",
    });
  }, [data, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Updated Account:", data);
    console.log("Updated value:", values);

    try {
      const editUserProfileController = createEditProfileControl();
      const result = await editUserProfileController.editUserProfileController(
        data.id,
        values.name,
        values.role,
        values.address,
        values.mobileNum
      );
      console.log("profile edit result ", result);

      if (result) {
        obj.displaySucessUI();
        modal.close();
        router.refresh();
      } else {
        obj.displayErrorUI();
      }
    } catch (error) {
      console.log(error);
      obj.displayErrorUI();
    }
  };

  return (
    <dialog id="user_profile_edit_modal" className="modal">
      <div className="modal-box text-slate-300">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4">User Account Edit</h3>

          {/* Name field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Name
            <input
              {...register("name")}
              type="text"
              className={`grow ${errors.name ? "input-error" : ""}`}
              placeholder="Enter name"
            />
          </label>
          {errors.name && <p className="text-error">{errors.name.message}</p>}

          {/* Role field - Dropdown */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Role
            <select
              {...register("role")}
              className={`grow ${errors.role ? "input-error" : ""}`}
            >
              <option value="" disabled>
                Select role
              </option>
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          {errors.role && <p className="text-error">{errors.role.message}</p>}

          {/* Address field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Address
            <input
              {...register("address")}
              type="text"
              className={`grow ${errors.address ? "input-error" : ""}`}
              placeholder="Enter address"
            />
          </label>
          {errors.address && (
            <p className="text-error">{errors.address.message}</p>
          )}

          {/* Mobile Number field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Mobile Number
            <input
              {...register("mobileNum")}
              type="text"
              className={`grow ${errors.mobileNum ? "input-error" : ""}`}
              placeholder="Enter mobile number"
            />
          </label>
          {errors.mobileNum && (
            <p className="text-error">{errors.mobileNum.message}</p>
          )}

          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
}
