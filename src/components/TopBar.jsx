import axios from 'axios'
import React, { useContext } from 'react'
import { Context } from '../context/user-context'
import { FcSearch } from 'react-icons/fc'
import { FiLogOut } from 'react-icons/fi'
import { BsFillBellFill } from 'react-icons/bs'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import NotificationsBox from './NotificationsBox'


export default function TopBar({ opensideDrawer, notifications ,setnotifications }) {

    const navigate = useNavigate();
    const [showNotifications, setshowNotifications] = useState(false);


    const { user } = useContext(Context);

    const logout = async () => {

        try {
            await axios.get('/api/auth/logout');
            navigate("/auth");
        } catch (error) {
            console.log("error in logging out");
        }
    }

    return (

        <div className='top-header flex justify-between p-2 bg-white rounded'>
            <div className="search flex md:gap-2  items-center border p-1 cursor-pointer" onClick={opensideDrawer} >
                <FcSearch size={30} />
                <p className='md:text-xl'>search people</p>
            </div>
            <div className="title md:text-3xl text-xl font-bold md:w-[70%]  text-center text-green-400 "> <span className="text-blue-400">Chat</span>-ify</div>
            <div className="dp-box flex items-center gap-4 relative">
                <img src={user && user.profilePic} alt="" className='w-10 h-10 rounded-full object-cover' />

                <div className="relative">
                    {
                        notifications.length   !== 0 ? (<div className="  notification-counter ">{notifications.length  }</div>) : ""

                    }

                    <BsFillBellFill size={25} onClick={()=>setshowNotifications(!showNotifications)} className="cursor-pointer"/>
                </div>
                <NotificationsBox  notifications={notifications} setnotifications={setnotifications} display={showNotifications}/>

                <FiLogOut size={25} className="cursor-pointer" onClick={logout} />
            </div>
        </div>

    )
}
