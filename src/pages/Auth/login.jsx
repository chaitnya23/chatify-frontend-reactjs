import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import useAxios from '../../Hooks/useAxios'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    // states
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");


    //navigation
    const navigate = useNavigate();

    // post login data
    const postLogin = async () => {

        try {
            const { data } = await axios.post("https://chatify-backend.vercel.app/api/auth/login", {
                userName, password
            });

            navigate("/");

        } catch (error) {
            
            console.log(error);
        }
    }


    return (
        <div >
            <div className="input-box my-4">
                <label htmlFor="userName" className='font-semibold text-xl p-1'>Username *</label>
                <input type="text" name='userName' id='userName' value={userName} onChange={(e) => setuserName(e.target.value)} placeholder='Enter your username' required />
            </div>

            <div className="input-box my-4">
                <label htmlFor="password" className='font-semibold text-xl p-1'>Password *</label>
                <input type="password" name='password' id='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter  Password' required />
            </div>

            <button className='login-btn' onClick={postLogin} >Login</button>
        </div>
    )
}
