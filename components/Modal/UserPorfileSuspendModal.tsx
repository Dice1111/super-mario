import SuspendUserProfileUI from "@/app/boundaries/AdminUI/SuspendUserProfileUI";
import { createSuspendProfileControl } from "@/controls/services/userProfileServices";
import { Status, UserProfile } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SuspendUserProfileProps {
  data: UserProfile;
  obj: SuspendUserProfileUI;
}

const UserProfileSuspendModal = ({ data, obj }: SuspendUserProfileProps) => {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const modal = document.getElementById(
        "user_profile_suspend_modal"
      ) as HTMLDialogElement;
      const newStatus =
        data.status === Status.active ? Status.inactive : Status.active;
      const suspendUserProfileController = createSuspendProfileControl();
      const result =
        await suspendUserProfileController.suspendUserProfileEntityController(
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
    <dialog id="user_profile_suspend_modal" className="modal">
      <div className="modal-box text-slate-300">
        <h3 className="font-bold text-lg mb-4">
          Change Profile status to{" "}
          {data.status === Status.active ? Status.inactive : Status.active} for{" "}
          {data.userEmail}?
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
                "user_profile_suspend_modal"
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

export default UserProfileSuspendModal;
