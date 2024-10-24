"use client"

import React from 'react'
import UserAccountEditModal from '../Modal/UserAccountEditModal'

const openUserAccountEditModal = () => {
    const modal = document.getElementById('user_account_edit_modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };


  

const UserAccountTable = () => {
  return (
    <>
      <h1 className='ml-4 mt-10 font-bold text-lg'>User Accounts</h1>

      {/* {search box} */}
      <div className='flex pt-10 pb-10 pl-4 text-slate-300'> 
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow w-56" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
      </div>
    
      {/* table frame */}
      <div className="overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead className='text-black'>
          <tr>
            <th>User ID</th>
            <th>Password</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Edit</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>
              1
            </td>
            <td>
              *******
            </td>
            <td>apple@gmail.com</td>
            <td>21.10.2024</td>
            <td>23.10.2024</td>
            <th>
              <button className="btn btn-xs" onClick={openUserAccountEditModal}>details</button>
            </th>
            <th>
            <input type="checkbox" className="toggle toggle-success" defaultChecked />
            </th>
          </tr>
          {/* row 1 */}
          <tr>
            <td>
              1
            </td>
            <td>
              *******
            </td>
            <td>apple@gmail.com</td>
            <td>21.10.2024</td>
            <td>23.10.2024</td>
            <th>
              <button className="btn btn-xs">details</button>
            </th>
            <th>
            <input type="checkbox" className="toggle toggle-success" defaultChecked />
            </th>
          </tr>
          {/* row 1 */}
          <tr>
            <td>1</td>
            <td>*******</td>
            <td>apple@gmail.com</td>
            <td>21.10.2024</td>
            <td>23.10.2024</td>
            <th><button className="btn btn-xs">details</button></th>
            <th><input type="checkbox" className="toggle toggle-success" defaultChecked /></th>
          </tr>
          {/* row 1 */}
          <tr>
            <td>
              1
            </td>
            <td>
              *******
            </td>
            <td>apple@gmail.com</td>
            <td>21.10.2024</td>
            <td>23.10.2024</td>
            <th>
              <button className="btn btn-xs">details</button>
            </th>
            <th>
            <input type="checkbox" className="toggle toggle-success" defaultChecked />
            </th>
          </tr>
          {/* row 1 */}
          <tr>
            <td>
              1
            </td>
            <td>
              *******
            </td>
            <td>apple@gmail.com</td>
            <td>21.10.2024</td>
            <td>23.10.2024</td>
            <th>
              <button className="btn btn-xs">details</button>
            </th>
            <th>
            <input type="checkbox" className="toggle toggle-success" defaultChecked />
            </th>
          </tr>
        </tbody>
      </table>
      </div>
      <UserAccountEditModal/>
    </>
  )
}

export default UserAccountTable