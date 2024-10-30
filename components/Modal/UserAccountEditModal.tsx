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

interface ConfirmEditDialogProps {
  isOpen: boolean;
  onConfirm: (email: string, password: string) => void;
  onCancel: () => void;
  initialEmail?: string;
  initialPassword?: string;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export function UserAccountEditModal({
  isOpen,
  onConfirm,
  onCancel,
  initialEmail = "",
  initialPassword = "",
}: ConfirmEditDialogProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialEmail,
      password: initialPassword,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const handleConfirm = handleSubmit((data) => {
    onConfirm(data.email, data.password);
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
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="col-span-3"
              />
              {errors.email && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="col-span-3"
              />
              {errors.password && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.password.message}
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
