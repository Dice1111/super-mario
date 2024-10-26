import EditUserProfileUI from "@/app/boundaries/AdminUI/EditUserProfileUI";
import SuspendUserProfileUI from "@/app/boundaries/AdminUI/SuspendUserProfileUI";
import ViewUserProfileUI from "@/app/boundaries/AdminUI/ViewUserProfileUI";
import {
  createViewProfileControl,
  createSearchProfileControl,
} from "@/controls/services/userProfileServices";
import { Status, UserProfile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ViewUserProfileProps {
  obj: ViewUserProfileUI;
}

const UserProfileTable = ({ obj }: ViewUserProfileProps) => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const hasFetchedRef = useRef<boolean>(false); // Ref to track if fetch has occurred
  const router = useRouter();

  const viewUserProfileController = createViewProfileControl();
  const fetchUsers = async () => {
    try {
      const data = await viewUserProfileController.viewUserProfileController();
      setUserProfiles(data);
      obj.displaySucessUI();
    } catch (error) {
      obj.displayErrorUI();
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchUsers();
      return () => {
        hasFetchedRef.current = true;
      };
    }
  }, []);

  useEffect(() => {
    const modalId =
      modal?.props.obj instanceof EditUserProfileUI
        ? "user_profile_edit_modal"
        : modal?.props.obj instanceof SuspendUserProfileUI
        ? "user_profile_suspend_modal"
        : null;

    if (modalId) {
      const dialog = document.getElementById(modalId) as HTMLDialogElement;
      dialog?.showModal();
    }
  }, [modal]);

  function handleEditButton(userProfile: UserProfile) {
    const editUserProfileBoundary = EditUserProfileUI.getInstance();
    const editModal =
      editUserProfileBoundary.displayEditUserProfileUI(userProfile);
    setModal(editModal);
  }

  function handleSuspenButton(userProfile: UserProfile) {
    const suspendUserAccountBoundary = SuspendUserProfileUI.getInstance();
    const suspendModal =
      suspendUserAccountBoundary.displaySuspendUserProfileUI(userProfile);
    setModal(suspendModal);
  }

  async function handleSearchButton(data: string) {
    if (data) {
      const SearchUserProfileController = createSearchProfileControl();
      try {
        const searchResult: UserProfile | null =
          await SearchUserProfileController.searchUserProfileController(data);

        if (searchResult) {
          console.log(true);
          setUserProfiles([searchResult]);
        } else {
          alert("no user found");
          console.log(false);
        }
      } catch (error) {
        console.error("Error searching for user account:", error);
      }
    } else {
      alert("no user found");
      return;
    }
  }

  function handleCreateButton() {
    router.push("/auth/create_profile/");
  }

  return (
    <>
      <h1 className="ml-4 mt-10 font-bold text-lg">User Profiles</h1>
      {/* search box */}
      {/* Search Box */}
      <div className="flex pt-10 pb-10 pl-4 text-slate-300">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow w-56"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchButton(e.currentTarget.value);
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <button
          onClick={handleCreateButton}
          className="btn btn-outline btn-success ml-10"
        >
          Create New Profile
        </button>
      </div>

      {/* table frame */}
      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>No.</th>
              <th>Profile ID</th>
              <th>Name</th>
              <th>Relation To</th>
              <th>Role</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Edit</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.map((userProfile, index) => (
              <tr key={userProfile.id}>
                <td>{index + 1}</td>
                <td>{userProfile.id}</td>
                <td>{userProfile.name}</td>
                <td>{userProfile.userEmail}</td>
                <td>{userProfile.role}</td>
                <td>{userProfile.mobileNumber || ""}</td>
                <td>{userProfile.address || ""}</td>
                <td>{new Date(userProfile.createdAt).toLocaleString()}</td>
                <td>{new Date(userProfile.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleEditButton(userProfile)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={userProfile.status === Status.active} // Updated to userProfile
                      onChange={() => handleSuspenButton(userProfile)} // Updated to userProfile
                    />
                    <span className="ml-2">
                      {userProfile.status === Status.active
                        ? Status.active
                        : Status.inactive}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal}
    </>
  );
};

export default UserProfileTable;
