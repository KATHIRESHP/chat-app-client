import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios';
import { getAllMessages, sendMessageRoute } from '../utils/APIroutes';
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const effect = async () => {
            console.log(currentChat?._id);
            const responses = await axios.post(getAllMessages, {
                from: currentUser?._id,
                to: currentChat?._id
            })
            console.log(responses.data);
            setMessages(responses.data);
        }
        effect();
    }, [currentChat])

    const toastOptions = {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: true, 
        theme: "dark"
    }
    const logoutHandler = () => {
        localStorage.clear();
        toast.warning("Signing out", toastOptions);
        setTimeout(() => navigate('/login'), 3000);
    }
    const handleSendMsg = async (msg) => {
        const data = await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            msg: msg,
        });

        // socket.current.emit("send-msg", {
        //     to: currentChat._id,
        //     from: currentUser._id,
        //     message: msg,
        // })

        const tempMsg = [...messages];
        tempMsg.push({fromSelf: true, message: msg});
        setMessages(tempMsg);

    }

    // useEffect(() => {
    //     if(socket.current)
    //     {
    //         console.log("Entered socket");
    //         socket.current.on("msg-receive", (msg) => {
    //             console.log({msg});
    //             setArrivalMsg({fromSelf: false, message: msg});
    //         })
    //     }
    // }, [])

    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
    }, [arrivalMsg])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    })

    return (
        currentChat && (
            <div className='w-full flex flex-col'>
                <div className='flex bg-white/10 justify-between w-full p-2'>
                    <div className='flex items-center'>
                        <img
                            src={`${currentChat.avatarImage}`}
                            alt='avatar'
                            className='h-2/12 w-2/12 md:h-2/12 md:w-2/12 mx-6'
                        ></img>
                        <div className='username'>
                            <div className='text-lg md:text-xl'>
                                {currentChat.username}
                            </div>
                        </div>
                    </div>
                    <div className='md:flex mr-3 items-center justify-end w-full hidden'>
                        <button className='text-3xl bg-blue-500 rounded-sm p-2 hover:bg-red-500'
                        onClick={() => logoutHandler()}>
                            <i class="bi bi-box-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div className='text-white flex-1 overflow-y-scroll h-full'>
                    <Messages messages={messages} scrollRef={scrollRef} uuidv4={uuidv4} />
                </div>
                    <ChatInput handleSendMsg={handleSendMsg} currentChat={currentChat}/> 
                <ToastContainer/>
            </div>
        )
    );
};

export default ChatContainer;
