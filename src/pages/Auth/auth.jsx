import React from 'react'
import { useState } from 'react'
import Login from './login'
import Singup from './singup'

export default function Auth() {

    const [isLogin, setisLogin] = useState(true);

    return (
        <div className=' md:w-[30%] w-full m-auto mt-1 p-2 text-lg '>

            <div className="company-title p-1 my-6 border rounded bg-white">
                <p className="text-center p-3 text-4xl ">Chat-ify</p>
            </div>

            <div className="auth-box bg-white p-3 rounded-md">
                <div className="flex my-4 text-xl font-semibold">
                    <div className={`auth-btns ${isLogin?"bg-blue-200":"bg-white"}`} onClick={()=>setisLogin(true)}>Login</div>
                    <div className={`auth-btns ${!isLogin?"bg-blue-200":"bg-white"}`} onClick={()=>setisLogin(false)}>Sign up</div>
                </div>

                {
                    isLogin ?<Login/>:<Singup/>
                }

            </div>
        </div>
    )
}
