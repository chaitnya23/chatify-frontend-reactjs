import axios from 'axios'
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Context } from '../context/user-context';

export default function SideDrawer({ close }) {

    const [search, setsearch] = useState("");
    const [searchResult, setsearchResult] = useState([]);

    const handleSearch = async () => {

        try {

            const { data } = await axios.get(`/api/user/search/${search}`);
            setsearchResult(data);

        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div className='absolute top-0 bottom-0 right-0 left-0  backdrop-blur-lg flex items-center z-20 '>

            <div className="drawer-content h-full md:w-[25%] w-full my-auto bg-white  rounded p-3">
                <button onClick={close} className="text-red-500 font-semibold float-right scale-150 p-2 mx-4 my-auto">X</button>
                <p className="font-semibold text-2xl border p-2">Search Users</p>

                <div className="input-box my-7 flex  gap-2">
                    <input
                        type="text"
                        name='search'
                        id='search'
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        className='my-1 '
                        placeholder='search'
                        required />

                    <button onClick={handleSearch} className=' mx-2  border font-semibold bg-gray-200 px-5 hover:bg-green-300 rounded'>Go</button>
                </div>

                <div className="users-result h-[75%]">
                    {
                        searchResult && searchResult.map(({ _id, userName, profilePic, name }, i) => {

                            return (
                                <UserSLide close={close} id={_id} userName={userName} name={name} profilePic={profilePic} />
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}

const UserSLide = ({ id, userName, profilePic, close, name }) => {

    const { user, setselectedChat } = useContext(Context);

    const select = async () => {

        try {
            const { data } = await axios.post("/api/chat/get", {
                user: user._id,
                receiver: id
            });
            console.log(data);

            setselectedChat(data);
            // window.location.reload();

        } catch (error) {
            console.log(error);
        }
        close();
    }

    return (
        <div className='user-box ' onClick={select}>
            <img src={profilePic} alt="" className="w-10 h-10 rounded-full object-cover mx-2" />
            <div className="user-detail">
                <p className="text-lg font-medium">{userName && userName}</p>
                <p className="text-lg mt-1 ">{name}</p>

            </div>
        </div>
    )
}