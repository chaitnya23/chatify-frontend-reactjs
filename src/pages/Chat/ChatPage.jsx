import React, { useContext, useState } from 'react'
import SideDrawer from '../../components/SideDrawer'
import TopBar from '../../components/TopBar'
import MessageBox from './MessageBox'
import MyChats from './MyChats'
import { Context } from '../../context/user-context';
import GroupInputBox from '../../components/GroupInputBox'

export default function ChatPage() {

  const [displayDrawer, setdisplayDrawer] = useState(false);
  const [openGrpInput, setopenGrpInput] = useState(false);
  const [loading, setloading] = useState(false);
  const [notifications, setnotifications] = useState([]);

  return (
    <div className='p-2'>

      {openGrpInput && <GroupInputBox closeGrpbox={() => setopenGrpInput(false)} />}

      <TopBar
        opensideDrawer={() => setdisplayDrawer(true)}
        notifications={notifications}
        setnotifications={setnotifications}
      />

      {displayDrawer && <SideDrawer close={() => setdisplayDrawer(false)} />}

      <div className="md:flex md:h-[90vh] h-[91vh]  md:gap-3   md:p-2">

        <MyChats OpenGrpBox={() => setopenGrpInput(true)}
          loading={loading}
          setloading={setloading}

        />

        <MessageBox  setnotifications={setnotifications} notifications={notifications}/>
          
      </div>

    </div>
  )
}
