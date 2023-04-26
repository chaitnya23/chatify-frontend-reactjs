import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/user-context';

export default function Profile({ closeProfile, user }) {

    const { selectedChat } = useContext(Context);

    return (
        <div className='absolute backdrop-blur-lg top-0 right-0 left-0 h-screen flex justify-center items-center'>

            {
                !selectedChat.isGroupChat ?

                    (<div className="profile-box bg-white p-3 rounded-md md:w-1/4 w-[80%]">
                        <span className="float-right text-2xl p-1 text-red-400 cursor-pointer" onClick={closeProfile}>X</span>
                        <img src={user && user.profilePic} alt="" className="w-48  my-6 h-48 object-cover rounded-full m-auto" />
                        <div className="div user-info my-5">
                            <p className="text-center font-semibold font-serif text-2xl">{user && user.userName}</p>
                            <p className="text-center text-lg mt-7">{user && user.name}</p>
                        </div>
                    </div>)
                    : (
                        <div className='bg-white p-3 rounded-md md:w-1/4 w-[80%]'>
                            <span className="float-right text-2xl p-1 text-red-400 cursor-pointer" onClick={closeProfile}>X</span>

                            <p className="text-3xl font-semibold font-serif p-4 text-center">{selectedChat.groupName}</p>
                            <p className="p-2">Members :</p>
                            {
                                selectedChat &&
                                selectedChat.users.map((p, i) => {

                                    return (

                                        <Member person={p} admin={selectedChat.admin} key={i} />
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}


const Member = ({ person, admin }) => {

    // console.log(admin , person._id);
    return (
        <div className='user-box ' >
            <img src={person && person.profilePic} alt="" className="w-10 h-10 object-cover rounded-full mx-2" />
            <div className="user-detail w-full">
                <div className="flex justify-between">
                    <p className="text-lg font-medium">{person.userName && person.userName}</p>
                    {
                        admin === person._id && (<span className='float-right rounded-md border-2 font-medium  px-1'> admin</span>)
                    }
                </div>
                <p className="text-lg font-medium">{person.name && person.name}</p>

            </div>
        </div>
    )
}