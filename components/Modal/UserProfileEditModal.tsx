import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";

interface ConfirmEditDialogProps {
  isOpen: boolean;
  initialName: string;
  initialAddress: string | null;
  initialMobileNumber: string | null;
  initialRole: Role;
  onConfirm: (
    name: string,
    address: string,
    mobileNumber: string,
    role: Role
  ) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  address: z.string().nullable(),
  mobileNumber: z.string().nullable(),
  role: z.nativeEnum(Role, {
    required_error: "Role is required",
  }),
});

export function UserProfileEditModal({
  isOpen,
  onConfirm,
  onCancel,
  initialName = "",
  initialAddress = "",
  initialMobileNumber = "",
  initialRole = Role.buyer,
}: ConfirmEditDialogProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: initialName,
      address: initialAddress || "",
      mobileNumber: initialMobileNumber || "",
      role: initialRole,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const handleConfirm = handleSubmit((data) => {
    onConfirm(data.name, data.address, data.mobileNumber, data.role);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your account details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConfirm}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" {...register("name")} className="col-span-3" />
              {errors.name && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                className="col-span-3"
              />
              {errors.address && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobileNumber" className="text-right">
                Mobile Number
              </Label>
              <Input
                id="mobileNumber"
                {...register("mobileNumber")}
                className="col-span-3"
              />
              {errors.mobileNumber && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <select id="role" {...register("role")} className="col-span-3">
                <option value={Role.buyer}>Buyer</option>
                <option value={Role.seller}>Seller</option>
                <option value={Role.agent}>Used Car Agent</option>
                <option value={Role.admin}>Admin</option>
              </select>
              {errors.role && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
