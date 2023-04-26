import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineAddAPhoto } from 'react-icons/md'

export default function Singup() {

    const navigate = useNavigate();


    const [Loading, setLoading] = useState(false);
    const [profilePic, setprofilePic] = useState("");
    const [userDetail, setuserDetail] = useState({
        userName: "", name: "", password: "", confirmPassword: ""
    })


    const handleOnchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setuserDetail((userDetail) => {
            return { ...userDetail, [name]: value };
        })
    }

    //setting profile picture data
    const handleFileChange = async (file) => {
        if (file === undefined) {
            window.alert("something went wrong!! upload ur profile");
        }
        try {
            if (
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpg"
            ) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "socialix");
                data.append("cloud_name", "dkvpwutkh");

                setLoading(true);
                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/dkvpwutkh/image/upload",
                    data
                );
                // console.log(res);

                setLoading(false);
                setprofilePic(res.data.url);

                toast('profile uploaded successfully');
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);

            window.alert("something went wrong!!");
        }
    };

    const createAccount = async () => {

        if (userDetail.name === "" || userDetail.userName === "" || userDetail.password === "") {
            toast.error("please fill all the fields");
            return
        }

        if (userDetail.password !== userDetail.confirmPassword) {
            toast.error('password in current password field must be same!!');
            return;
        }
        try {
            const { data } = await axios.post("https://chatify-backend.vercel.app/api/auth/signup", {
                ...userDetail, profilePic
            })
            toast("sign up successfull");
            navigate('/');

        } catch (error) {
            toast.error('error occured cheack your internet connection!!');

        }
    }
    return (
        <div >
            <div className="input-box my-4">
                <label htmlFor="name" className='font-semibold text-xl p-1'>name *</label>
                <input type="text" name='name' id='name' placeholder='Enter your name' onChange={handleOnchange} value={userDetail.name} required />
            </div>

            <div className="input-box my-4">
                <label htmlFor="userName" className='font-semibold text-xl p-1'>Username *</label>
                <input type="text" name='userName' id='userName' placeholder='Enter your username' onChange={handleOnchange} value={userDetail.userName} required />
            </div>


            <div className="input-box my-4">
                <label htmlFor="password" className='font-semibold text-xl p-1'>Password *</label>
                <input type="password" name='password' id='password' placeholder='Enter  Password' onChange={handleOnchange} value={userDetail.password} required />
            </div>

            <div className="input-box my-4">
                <label htmlFor="profilePic" className='font-medium cursor-pointer text-xl p-1 flex gap-5'>
                    <MdOutlineAddAPhoto size={30} />
                    <p>select a profile picture</p>
                </label>
                <input type="file" className='hidden' name='profilePic' id='profilePic' onChange={(e) => handleFileChange(e.target.files[0])} />
            </div>

            <div className="input-box my-4">
                <label htmlFor="confirmPassword" className='font-semibold text-xl p-1'>confirm Password *</label>
                <input type="password" name='confirmPassword' id='confirmPassword' placeholder=' confirm Password' onChange={handleOnchange} value={userDetail.confirmPassword} required />
            </div>

            <button onClick={createAccount} className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-1 rounded h-10 my-2' >create account</button>
        </div>
    )
}
