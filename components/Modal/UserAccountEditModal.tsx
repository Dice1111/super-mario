import React from 'react';

const UserAccountEditModal = () => {
  return (
    <div>
      <dialog id="user_account_edit_modal" className="modal">
        <div className="modal-box text-slate-300">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-4">User Account Edit</h3>

          <form action="">
            {/* Password field with HTML validation */}
            <label className="input input-bordered flex items-center gap-2 mb-4">
              Password
              <input
                type="password"
                className="grow"
                placeholder="Enter password"
                minLength={6}  // Require at least 6 characters
                required        // Make the field required
              />
            </label>

            {/* Email field with HTML validation */}
            <label className="input input-bordered flex items-center gap-2 mb-4">
              Email
              <input
                type="email"
                className="grow"
                placeholder="Enter email"
                required        // Make the field required
              />
            </label>

            <button type='submit' className='btn'>
              Update
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UserAccountEditModal;
