import axios from 'axios'
import React from 'react'
import { useContext } from 'react';
import { Context } from '../context/user-context'
import { useState } from 'react'
import { toast } from 'react-toastify';

export default function GroupInputBox({ closeGrpbox }) {

    const [selectedMembers, setselectedMembers] = useState([]);
    const [groupName, setgroupName] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false);

    const { user } = useContext(Context);

    //select member for group and add to the state
    const handleMemberselect = (memberToadd) => {


        if (selectedMembers.includes(memberToadd)) {

            toast.error("user already selected...");
            return;
        }
        setselectedMembers((selectedMembers) => {
            return [...selectedMembers, memberToadd];
        });

    }

    const handleSearchChange = async (e) => {

        if (e.target.value === "") {
            setsearchResult([])
            return;
        }

        try {
            setloading(true);
            const { data } = await axios.get(`https://chatify-backend.vercel.app/api/user/search/${e.target.value}`);
            setsearchResult(data);
            setloading(false);



        } catch (error) {
            setloading(false);
            console.log('error in featching');
        }
    }

    // remove selected member
    const removeMember = (memberToRemove) => {

        setselectedMembers(selectedMembers.filter((ele) => {
            return memberToRemove._id !== ele._id;
        }))
    }

    //create group function
    const createGroup = async () => {

        if (selectedMembers.length < 2 || groupName === "") {
            toast.error("please select a group name and also add at least two members ")
        }

        try {

            const { data } = await axios.post("https://chatify-backend.vercel.app/api/chat/group/create", { name: groupName, members: selectedMembers, admin: user })
            console.log(data);
            closeGrpbox();
            toast("you created a new group");
        } catch (error) {
            console.log("error in creating group");
        }
    }

    return (
        <div className='flex absolute bottom-0 top-0 backdrop-blur-md right-0 left-0 justify-center items-center'>

            <div className="grp-input-form-control p-2 rounded bg-white md:w-[30%] w-[90%]">

                <span className="p-1 text-red-500 my-2 cursor-pointer font-bold" onClick={closeGrpbox}>X</span>
                <p className="md:text-3xl text-lg text-center my-3">Create Group Chat</p>

                <div className="members">
                    <p>members :</p>

                    <div className="grid md:grid-cols-4 grid-cols-3 gap-2">
                        {
                            selectedMembers &&
                            selectedMembers.map((person, i) => {
                                return (
                                    <div key={i} className='bg-purple-300 p-1 px-2 font-semibold rounded-md m-2 w-fit'>
                                        <span >{person.userName}</span>
                                        <span className='font-semibold text-lg ml-3 cursor-pointer' onClick={() => removeMember(person)}>X</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="input-box my-4">
                    <input type="text" name='grpname' id='grpname' placeholder='Choose a group name' value={groupName} onChange={(e) => setgroupName(e.target.value)} required />
                </div>

                <div className="input-box my-4">
                    <input type="text" name='member' onChange={handleSearchChange} id='password' placeholder='Add member ' required />
                </div>
                
                <div className="result">
                    {
                        loading ?
                            <div>loading........</div> : (
                                searchResult.slice(0, 4).map((ele, i) => {
                                    return (
                                        <UserBar
                                            key={i}
                                            person={ele}
                                            handleMemberselect={handleMemberselect}

                                        />
                                    )
                                })
                            )
                    }
                </div>
                
                <div className="create-btn flex justify-end my-4">
                    <button onClick={createGroup} className='p-1 px-4 rounded hover:bg-green-300 bg-green-400 font-semibold'>Create</button>
                </div>

            </div>
        </div>
    )
}

const UserBar = ({ person, handleMemberselect }) => {


    return (

        <div className='user-box ' onClick={() => handleMemberselect(person)}>
            <img src={person && person.profilePic} alt="" className="w-10 h-10 rounded-full object-cover mx-2" />
            <div className="user-detail">
                <p className="text-lg font-medium">{person.userName && person.userName}</p>
                <p className="text-lg font-medium">{person.name && person.name}</p>

            </div>
        </div>
    )
}