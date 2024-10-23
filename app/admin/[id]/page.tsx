import React from 'react'

interface Props{
    params: {id: string}
}

enum PageType {
  USER_ACCOUNT = "user_account",
  USER_PROFILE = "user_profile"
}



const page = ({params:{id}}: Props) => {

  if(id===PageType.USER_ACCOUNT){

    return (
      //<div className='text-black mt-20'>Hello{id}</div>
  
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
    )
  }else if(id===PageType.USER_PROFILE){
    return(
      <div className="overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead className='text-black'>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Role</th>
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
            <td>1</td>
            <td>Dice</td>
            <td>Dice@gmail.com</td>
            <td>Lakeside</td>
            <td>1212741</td>
            <td>Admin</td>
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

    )
  }


}

export default page