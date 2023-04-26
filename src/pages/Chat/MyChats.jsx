import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import UserBox from '../../components/UserBox';
import { Context } from '../../context/user-context';
import useAxios from '../../Hooks/useAxios';
import ClipLoader from "react-spinners/ClipLoader";
import Loader from '../../components/Loader';

export default function MyChats({OpenGrpBox ,loading ,setloading }) {

    const { user, selectedChat } = useContext(Context);
    const [chats, setchats] = useState([])

 
    useEffect(() => {

        const getMyChats = async () => {

            try {

                if(user!==null){

                    setloading(true);
                    const { data } = await axios.get(`https://chatify-backend.vercel.app/api/chat/get/mychats/${user && user._id}`);
                    setchats(data)
                    setloading(false);

                }


            } catch (error) {
                setloading(false);

                console.log(error);
            }
        }

        getMyChats();
    }, [user, selectedChat])



    return (
        <div className={`md:w-[30%] w-full p-2 h-full bg-white my-chats rounded ${selectedChat ? "hidden" : "block"} md:block`}>
            <div className="title flex gap-2 justify-between my-3">
                <p className='text-3xl mx-3 '>My Chats</p>
                <div className="add-group text-lg p-2 rounded bg-gray-200 mx-3 cursor-pointer " onClick={OpenGrpBox}>Create New Group <span className="font-semibold text-2xl"> +</span> </div>
            </div>

            {
                loading ?(
                    <Loader/>
                ):
                (

                    <div className="my-chats-box max-h-[70%] overflow-scroll p-2  bg-gray-100">
                        {
                            chats &&
                            chats.map((ele, i) => {
                                return (
                                    <UserBox chat={ele} key={i} />
                                )
                            })
                        }
        
                    </div>
                )
            }
        </div>
    )
}
