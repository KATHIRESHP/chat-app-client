import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIroutes';
import axios from 'axios'

const Register = () => {

    const [values, setValues] = useState({
        username: "",
        email:"",
        password: "",
        confirmpassword: ""
    })

    const navigate = useNavigate();

    const toastOptions = {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: true, 
        theme: "dark"
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(localStorage.getItem('chat-app-user'))
        {
          navigate('/');
        }
      }, [])

    const validator = (e) => {
        const {email, password, confirmpassword, username} = values;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email) || password != confirmpassword || password.length < 8 || username.length < 3 || !passwordRegex.test(password))
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
        const {username, email, password} = values;
        if(validator())
        {
            const {data} = await axios.post(registerRoute, {username, email, password});
            if(data.status == false)
            {
                toast.error(data.msg, toastOptions);
            }
            else if(data.status == true)
            {
                toast.success("User created", toastOptions);
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
                        <img src={logo} alt='logo' className='h-16 animate-pulse shadow-2xl rounded-full bg-gradient-to-t from-blue-600 to-red-500'></img>
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-red-950 text-3xl'>Arattai</span>
                    </div>
                    <form onSubmit={(e) => submitHandler(e)} className='flex flex-col gap-5 mt-7'>
                        <input placeholder='Name' className="rounded-sm px-5 py-1 focus:ring-2 space-x-5" type='text' name='username'
                        onChange={(e) => handleChange(e)}/>
                        <input placeholder='Email' className="rounded-sm px-5 py-1 focus:ring-2" type='email' name='email'
                        onChange={(e) => handleChange(e)}/>
                        <input placeholder='Password' className="rounded-sm px-5 py-1 focus:ring-2" type='password' name='password'
                        onChange={(e) => handleChange(e)}/>
                        <input placeholder='Confirm Password' className="rounded-sm px-5 py-1 focus:ring-2" type='password' name='confirmpassword'
                        onChange={(e) => handleChange(e)}/>
                        <button className='bg-blue-600 rounded-sm py-1 hover:bg-teal-600' type='submit'>Create</button>
                        <div>
                            <span>Already have an account?<Link className='text-blue-900 italic' to='/login'>Login</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register