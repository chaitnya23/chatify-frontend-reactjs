import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { Context } from '../context/user-context'
import { chatlastMessage, getOtherUser } from '../Helpers/Logics';

export default function UserBox({ chat }) {

  const { user, setselectedUser, setselectedChat } = useContext(Context);


  return (
    <div className='user-box ' onClick={() => setselectedChat(chat)}>
      {!chat.isGroupChat && <img src={getOtherUser(user, chat && chat.users).profilePic} alt="" className="w-11 h-11 object-cover rounded-full mx-2" />}
      <div className="user-detail">
        {
          !chat.isGroupChat ?
            (
        
              <p className="text-lg font-medium">{getOtherUser(user, chat && chat.users).userName}</p>
              


            ) : (

              <p className='font-medium p-1 text-xl py-1  w-full'>{chat.groupName}</p>
            )
        }
        <p className='mt-1 font-md  p-1 overflow-hidden'>{chatlastMessage(chat.messages, user)}</p>
      </div>
    </div>
  )
}
