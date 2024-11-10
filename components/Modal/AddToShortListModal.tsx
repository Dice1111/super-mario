import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserAccountSuspendProps {
  handleConfirm: () => void;
}

export default function AddToShotListModal({
  handleConfirm,
}: UserAccountSuspendProps) {
  return (
    <Dialog open onOpenChange={handleConfirm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shortlist</DialogTitle>
          <DialogDescription>Successful!</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
