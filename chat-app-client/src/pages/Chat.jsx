import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIroutes'
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'


const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentChat, setCurrentChat] = useState(undefined);
    const navigate = useNavigate();
    const socket = useRef();

    useEffect(() => {
        if(currentUser)
        {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(() => {
        const effect = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            }
            else {
                const tempUser = await JSON.parse(localStorage.getItem('chat-app-user'));
                setIsLoaded(true);
                setCurrentUser(tempUser);
            }
        };
        effect();
    }, [])

    useEffect(() => {
        const effect = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                    console.log("isNotLoaded true now");
                    console.log("Contacts set");
                }
                else {
                    navigate('/setAvatar');
                }
            }
            else {
                console.log("Currentuser undefined", currentUser);
            }
        };
        effect();
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <div className='flex'>
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            {
                isLoaded && currentChat === undefined ?
                <Welcome currentUser={currentUser}/>:
                <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
            }
        </div>
    )
}

export default Chat