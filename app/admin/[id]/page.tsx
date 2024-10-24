
import UserAccountTable from '@/components/Table/UserAccountTable'
import UserProfileTable from '@/components/Table/UserProfileTable'
import { notFound } from 'next/navigation'
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
      <UserAccountTable/>

    )
  }else if(id===PageType.USER_PROFILE){
    return(
      <UserProfileTable/>
      
    )
  }else{
    notFound();
  }


}

export default page