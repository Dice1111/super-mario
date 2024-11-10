import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Status, UserProfile } from "@prisma/client";

interface UserProfileSuspendProps {
  selectedUserProfile: UserProfile;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function UserAccountSuspendModal({
  selectedUserProfile,
  handleConfirm,
  handleCancel,
}: UserProfileSuspendProps) {
  const newStatus =
    selectedUserProfile.status === Status.active
      ? Status.inactive
      : Status.active;
  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will change user profile of &quot
            {selectedUserProfile.userEmail}&quot to &quot{newStatus}
            &quot.
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
