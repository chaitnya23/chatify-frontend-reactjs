import React, { createContext, useEffect, useState } from 'react'
import useAxios from '../Hooks/useAxios';
import {useNavigate} from 'react-router-dom';
import axios from "axios"

export const Context = createContext();

export default function AppContext({children}) {

    //navigation
    const navigate = useNavigate();

    const [user, setuser] = useState(null);
    const [selectedChat, setselectedChat] = useState(null);
    const [selectedUser, setselectedUser] = useState(null);

    //get user data with cookie
    useEffect(() => {
         
        const getUser = async()=>{
            try {
                
                const {data} = await  axios.get('https://chatify-backend.vercel.app/api/user');
                setuser(data);
                console.log(data);
               

            } catch (error) {
                
                //navigate to login
                console.log(error.message);
                navigate("/auth")
            }
        }

        getUser();
    }, [navigate]);
    
    
  return (
    <Context.Provider value={{user ,setuser  ,selectedChat ,setselectedChat ,selectedUser ,setselectedUser}}>
    {children}
    </Context.Provider>
  )
}
