import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/user-context';


export default function NotificationsBox({display , notifications, setnotifications }) {


  const {setselectedChat} = useContext(Context);


  const selectNotification = (chat)=>{
    setselectedChat(chat);

    setnotifications(notifications.filter((ele ,i)=>{
      return ele.chat!==chat;
    }))
  }

  if(notifications.length===0 && display){

    return (
      
      <div className='absolute w-72 rounded-md border p-2 bg-white top-9 right-7'>
      <p className="p-3 text-center text-lg">No notifications till now</p>
        </div>
    )
  }



  return (

    <>
 
  {
    display && (

      <div className='absolute w-72 rounded-md border p-2 bg-white top-9 right-7'>
      {
          notifications.map((notification)=>{
            return (
              <p className=' text-lg text-center p-3 my-2 border cursor-pointer' onClick={()=>selectNotification(notification.chat)}> <span className="font-semibold">{notification.name} </span> sent a message  </p>
            )
          })
        }
        </div>
    )
  }
      </>
  )
}
