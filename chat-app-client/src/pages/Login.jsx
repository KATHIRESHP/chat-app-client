import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIroutes';
import axios from 'axios'

const Login = () => {

    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    const toastOptions = {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    }

    useEffect(() => {
      if(localStorage.getItem('chat-app-user'))
      {
        navigate('/');
      }
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value});
    }

    const validator = (e) => {
        const {password, username} = values;
        if(password.length < 8 || username.length < 3)
        {
            toast.error("Kindly Re-check", toastOptions);
            return false;
        }
        else
        {
            return true;
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("Handler called");
        const {username, password} = values;
        if(validator())
        {
            const {data} = await axios.post(loginRoute, {username, password});
            if(data.status == false)
            {
                toast.error(data.msg, toastOptions);
            }
            else if(data.status == true)
            {
                toast.success("User Loggedin", toastOptions);
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                setTimeout(() => navigate('/'), 3000);
            }
        }
        console.log("submit handler");
    }

    return (
        <>
        <ToastContainer/>
            <div className='flex flex-col h-screen w-screen justify-center items-center'>
                <div className='bg-white/10 p-11 rounded-md'>
                    <div className='flex justify-center gap-11 items-center'>
                        <img src={logo} alt='logo' className='h-16 animate-pulse drop-shadow-2xl rounded-full bg-gradient-to-t from-blue-600 to-red-500'></img>
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-red-950 text-3xl'>Pazhagalam</span>
                    </div>
                    <form onSubmit={(e) => submitHandler(e)} className='flex flex-col gap-5 mt-7'>
                        <input placeholder='Name' className="rounded-sm px-5 py-1 focus:ring-2 space-x-5" type='text' name='username'
                        onChange={(e) => handleChange(e)}/>
                        <input placeholder='Password' className="rounded-sm px-5 py-1 focus:ring-2" type='password' name='password'
                        onChange={(e) => handleChange(e)}/>
                        <button className='bg-blue-600 rounded-sm py-1 hover:bg-teal-600' type='submit'>Login</button>
                        <div>
                            <span>Want create an account?<Link className='text-blue-900 italic' to='/register'>Register</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login