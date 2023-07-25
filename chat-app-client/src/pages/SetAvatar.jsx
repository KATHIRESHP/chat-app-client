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
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);


  const toastOptions = {
    autoClose: 3000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
  }

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user'))
    {
      navigate('/login');
    }
  }, [])

  const setProfilePicture = async () => {
    if (selectedAvatar == -1) {
      toast.error("Please select any avatar")
    }
    else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar]
      });
      console.log(data);
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
  }

  const handleImage = () => {
    console.log(e.target.files[0]);
  }
  return (
    <>
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
            <input type='file' onChange={(e) => handleImage(e)}></input>
            <button className='bg-blue-600 px-3 py-1 text-lg mt-11 rounded-sm' onClick={() => setProfilePicture()}>Choose</button>
          </div>
      }
    </>
  )
}

export default SetAvatar