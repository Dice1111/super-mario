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
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import UserAccountFormSchema, {
  UserAccountFormSchemaType,
} from "../Forms/UserAccountFormSchema";

interface UserAccountEditProps {
  selectedUser: User;
  submitEditUserAccount: (values: UserAccountFormSchemaType) => Promise<void>;
  handleCancel: () => void;
}

export function UserAccountEditModal({
  selectedUser,
  submitEditUserAccount,
  handleCancel,
}: UserAccountEditProps) {
  const form = useForm({
    resolver: zodResolver(UserAccountFormSchema),
    defaultValues: {
      email: selectedUser.email,
      password: selectedUser.password,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Make changes to your account details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitEditUserAccount)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                disabled
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
                New Password
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
