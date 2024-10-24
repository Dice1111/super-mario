import React from 'react'







const UserAccountEditModal = () => {

  const openUserProfileEditModal = () => {
    const modal = document.getElementById('user_profile_edit_modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
    
  return (
    <div>
      <dialog id="user_profile_edit_modal" className="modal">
        <div className="modal-box text-slate-300">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-4">User Profile Edit</h3>

          <form action="">
            <label className="input input-bordered flex items-center gap-2 mb-4">
              Name
              <input
                className="grow"
                placeholder="Enter name"
                minLength={6}  
                required     
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              Address
              <input
                className="grow"
                placeholder="Enter address"
                required 
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              Phone Number
              <input
                className="grow"
                placeholder="Enter phone number"
                required 
              />
            </label>

            <select className="select select-bordered w-full max-w-xs mb-4">
              <option disabled selected>Role</option>
              <option>Admin</option>
              <option>User</option>
              <option>Seller</option>
              <option>Used Car Agent</option>
            </select>
            <br/>

            <button type='submit' className='btn'>
              Update
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default UserAccountEditModal