import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UsedCarListing } from "@prisma/client";

interface UsedCarListingDeleteProps {
  selectedUsedCarListing: UsedCarListing;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function UsedCarListingDeleteModal({
  selectedUsedCarListing,
  handleConfirm,
  handleCancel,
}: UsedCarListingDeleteProps) {
  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will permanently delete used car listing &quot
            {selectedUsedCarListing.title}&quot.
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
