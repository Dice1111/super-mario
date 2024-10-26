import SuspendUserAccountUI from "@/app/boundaries/AdminUI/SuspendUserAccountUI";
import { createSuspendAccountControl } from "@/controls/services/userAccountService";
import { Status, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SuspendUserAccountProps {
  data: User;
  obj: SuspendUserAccountUI;
}

const UserAccountSuspendModal = ({ data, obj }: SuspendUserAccountProps) => {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const modal = document.getElementById(
        "user_account_suspend_modal"
      ) as HTMLDialogElement;
      const newStatus =
        data.status === Status.active ? Status.inactive : Status.active;
      const suspendUserAccountController = createSuspendAccountControl();
      const result =
        await suspendUserAccountController.suspendUserAccountController(
          data.id,
          newStatus
        );
      console.log(result);

      if (result) {
        obj.displaySucessUI();
        modal?.close();
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
    <dialog id="user_account_suspend_modal" className="modal">
      <div className="modal-box text-slate-300">
        <h3 className="font-bold text-lg mb-4">
          Change status to{" "}
          {data.status === Status.active ? Status.inactive : Status.active} for{" "}
          {data.email}?
        </h3>
        <div className="flex justify-end gap-2">
          <button type="button" className="btn" onClick={handleConfirm}>
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              const modal = document.getElementById(
                "user_account_suspend_modal"
              ) as HTMLDialogElement;
              if (modal) {
                modal.close(); // Close the dialog
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UserAccountSuspendModal;
