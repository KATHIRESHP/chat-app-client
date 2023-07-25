import React, { useEffect, useState } from 'react'
import loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/APIroutes';
import { Buffer } from 'buffer'

import axios from 'axios'

const SetAvatar = () => {

  const api = "http://api.multiavatar.com/65545"
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [baseSource, setBaseSource] = useState("");


  const toastOptions = {
    autoClose: 3000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
  }

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
    else {
      setIsLoading(false);
    }
  }, [])

  const setProfilePicture = async () => {
    if(isSelected) {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: baseSource
      });
      console.log(data.isSet);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        console.log("Navigated to home");
        toast.success("Profile is successfully taken", toastOptions);
        navigate('/');
      }
      else {
        toast.error("Error in setting profile", toastOptions);
      }
    }
    else
    {
      toast.error("Kindly select the profile", toastOptions);
    }
  }

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file.size < 2097152) {
      const base64 = await convertToBase64(file);
      setBaseSource(base64);
      toast.warning("Once choosen you will not be able to change", toastOptions);
      setIsSelected(true);
    }
    else
    {
      toast.error("Please choose size below 2MB", toastOptions);
    }
  }
  const convertToBase64 = (file) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        res(fileReader.result);
      };

      fileReader.onerror = (error) => {
        rej(error);
      }
    })
  }
  return (
    <>
    <ToastContainer/>
      {
        isLoading ? <div className=' h-screen flex justify-center items-center gap-11 '>
          <div className='animate-pulse text-white'>
            <div className='h-[40px] w-[80px] rounded-full bg-gradient-to-r from-red-950 bg-blue-950 animate-bounce shadow-2xl shadow-black flex justify-center items-center'>
              Loading...</div>
          </div>
        </div> :
          <div className='h-screen flex flex-col justify-center items-center'>
            <div className='mb-11'>
              <div className='text-3xl italic'>Pick any avatar as your profile</div>
            </div>
            <input type='file' onChange={(e) => handleImage(e)} className='bg-teal-600 p-5 rounded-md' accept="image/*" ></input>
            <img src={baseSource} className='h-4/12 w-4/12 my-5 shadow-2xl shadow-black rounded-3xl'></img>
            <button className='bg-blue-600 px-3 py-1 text-lg mt-11 rounded-sm' onClick={() => setProfilePicture()}>Choose</button>
          </div>
      }
    </>
  )
}

export default SetAvatar