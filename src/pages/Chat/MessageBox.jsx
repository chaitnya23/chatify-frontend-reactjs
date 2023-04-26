import axios from 'axios';
import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { AiOutlineArrowLeft, AiFillEye } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { TiGroup } from 'react-icons/ti'
import { toast } from 'react-toastify';
import { Context } from '../../context/user-context';
import { getOtherUser, isContains, isFirstMessage, isSameSender } from '../../Helpers/Logics'
import io from "socket.io-client";
import Profile from '../../components/Profile';
import BeatLoader from "react-spinners/BeatLoader";
import { useRef } from 'react';

const socket = io.connect("http://localhost:4000");

export default function MessageBox({ setnotifications, notifications }) {

    //context
    const { user, selectedChat, setselectedChat, selectedUser } = useContext(Context);

    const [inputMessage, setinputMessage] = useState("");
    const [Messages, setMessages] = useState([]);
    const [displayProfile, setdisplayProfile] = useState(false);
    const [typing, settyping] = useState({ status: false, typer: null });

    //dom refs
    const msgBoxRef = useRef(null);

    
    useEffect(() => {
        
        msgBoxRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        });
    }, [Messages])
    

    useEffect(() => {

    
        setMessages(selectedChat && selectedChat.messages);

        console.log('yess');

    }, [selectedChat])



    //socket events detect 
    useEffect(() => {

        socket.on('show-typing', ({ id, typer }) => {



            if (selectedChat && selectedChat._id === id && typer._id !== user._id) {

                settyping({ status: true, typer });
                setTimeout(() => {
                    settyping({ status: false, typer: null });

                }, 2100);

                console.log("next user is typing");
            }
        })

        socket.on('message-receive', (payload) => {

            const users = payload.chat.users;


            console.log(payload.chat.users.includes(user));


            if (selectedChat && selectedChat._id === payload.chat._id) {

                setMessages((Messages) => {
                    return [...Messages, { user: payload.sender, message: payload.message }];
                })

            }
            // create notification if user is not in chat
            else if (user !== null && users && isContains(users, user)) {


                if (!notifications.includes({ name: payload.sender.userName, chat: payload.chat })) {
                    setnotifications((notifications) => {
                        return [...notifications, { name: payload.sender.userName, chat: payload.chat }]
                    })
                }


            }
        })
    }, [socket, selectedChat])



    // send message function
    const sendMessage = async () => {


        if (inputMessage === "") {
            return;
        }
        try {

            const { data } = await axios.post(`/api/chat/add/message/${selectedChat && selectedChat._id}`, {
                user,
                message: inputMessage
            })

            setMessages([...Messages, { user, message: inputMessage }]);
            socket.emit("message-sent", { sender: user, message: inputMessage, chat: selectedChat });
            setinputMessage("");

        } catch (error) {

            console.log("error in sending msg", error);
        }
    }

    const OnmsgInputChange = (e) => {

        setinputMessage(e.target.value);
        socket.emit('typing', { id: selectedChat._id, typer: user });
    }

    return (
        <div className='bg-white md:w-[70%] rounded md:p-2 h-full'>

            {
                displayProfile && <Profile closeProfile={() => setdisplayProfile(false)} user={getOtherUser(user, selectedChat && selectedChat.users)} />
            }
            <div className="messages-container-main bg-gray-200 h-[90%]">

                {
                    selectedChat ? (
                        <div className="h-full ">

                            <div className="chat-user-box flex p-3 justify-between items-center bg-gray-100">
                                <div className="w-fit flex gap-4">
                                    <AiOutlineArrowLeft size={25} onClick={() => setselectedChat(null)} className="md:hidden " />
                                    {selectedChat.isGroupChat && <TiGroup size={35} />}
                                    <p className='md:text-3xl'>{selectedChat.isGroupChat ? selectedChat.groupName : getOtherUser(user, selectedChat && selectedChat.users).userName}</p>
                                </div>
                                <AiFillEye size={30} onClick={() => setdisplayProfile(true)} className="cursor-pointer" />
                            </div>

                            <div className='h-full'>
                                <div className="all-messages-container h-[90%]  p-2" >
                                    {
                                        Messages &&
                                        Messages.map((msg, i) => {

                                            return (
                                                <Message Messages={Messages} message={msg.message} isGroupChat={selectedChat.isGroupChat} sender={msg.user} key={i} idx={i} />
                                            )
                                        })
                                    }
                                    <div ref={msgBoxRef}/>

                                    {typing.status && <div className='flex gap-2 ml-2 my-2 items-center'>
                                        <img src={typing.typer && typing.typer.profilePic} alt="" className='w-10 h-10 rounded-full object-cover' />
                                        <BeatLoader />
                                    </div>}

                                </div>
                                <div className="send-input-box p-1 my-3 text-lg flex items-center gap-2  bg-gray-100 border">

                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={OnmsgInputChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                sendMessage();
                                            }
                                        }}

                                        name='message'
                                        placeholder='Messsage'
                                        id='message'
                                        className='outline-none bg-transparent p-1 w-[95%] ' />
                                    <FiSend size={35} className="cursor-pointer" onClick={sendMessage} />
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className='md:flex justify-center items-center h-[95%] text-4xl'>
                            <img src="/not-selected-img.png" alt="" className='w-1/2 h-3/4' />
                            <p >Not Selected Any Chat</p>
                        </div>
                    )
                }



            </div>
        </div>
    )
}

const Message = ({ sender, message, Messages, idx, isGroupChat }) => {

    const { user } = useContext(Context);

    return (
        <div className={`w-full flex justify-${isSameSender(sender, user) ? "end" : "start"}  text-lg`}>

            <div className="w-fit flex gap-2 items-start ">
                {
                    isFirstMessage(Messages, idx, sender, user) && !isSameSender(sender, user) ?
                        (

                            <img src={sender && sender.profilePic} alt="" className="w-10 h-10 rounded-full object-cover my-2" />
                        ) : (
                            <div className='w-10 h-10'></div>
                        )
                }
                <div className={`max-w-xl p-2 px-3  my-2 rounded-xl ${isSameSender(sender, user) ? "bg-green-300" : "bg-blue-200"}`}>
                    {
                        isGroupChat && !isSameSender(sender, user) &&
                        <p className='p-1 text-sm rounded-md bg-gray-200 font-medium'>{sender.userName}</p>
                    }
                    <span className='p-1 '>{message}</span>
                </div>
            </div>
        </div>
    )
}