import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Status, User } from "@prisma/client";

interface UserAccountSuspendProps {
  selectedUser: User;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function UserAccountSuspendModal({
  selectedUser,
  handleConfirm,
  handleCancel,
}: UserAccountSuspendProps) {
  const newStatus =
    selectedUser.status === Status.active ? Status.inactive : Status.active;

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will change user "{selectedUser.email}" to "{newStatus}
            ".
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
