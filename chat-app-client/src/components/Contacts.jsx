import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const contactRef = useRef()

    useEffect(() => {
        const effect = () => {
            if (currentUser) {
                setCurrentUserName(currentUser.username);
                setCurrentUserImage(currentUser.avatarImage);
            }
        };
        effect();
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        changeChat(contact);
        setCurrentSelected(index);
    };

    const contactHandler = (e) => {
        if(contactRef.current.classList.contains('hidden'))
        {
            contactRef.current.classList.remove('hidden');
        }
        else
        {
            contactRef.current.classList.add('hidden');
        }
    }
    return (
        <>
            <div className='w-3/12 md:w-5/12 lg:w-4/12 xl:w-3/12 hidden h-screen md:flex md:flex-col transition-all ease-in-out justify-between overflow-scroll hover:overflow-scroll'>
                {
                    currentUserName && currentUserImage && (
                        <>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='flex-none flex h-6/12 w-6/12 md:flex-shrink-1 cursor-not-allowed py-3 m-2 p-2 justify-center md:sticky md:top-0 bg-blue-950 items-center'>
                                    <img src={`${currentUserImage}`}
                                        style={{ borderRadius: "50%" }}
                                        alt='avatar' className='h-8/12 w-8/12 animate-pulse' ></img>
                                </div>
                                {
                                    contacts.map((contact, index) => {
                                        return (
                                            <>
                                                <div
                                                    className={`contact cursor-pointer bg-white/10 flex items-center flex-shrink-1 justify-center md:justify-start  m-2 p-2 ${index === currentSelected ? "rounded-md bg-white/50 shadow-2xl shadow-black " : ""}`}
                                                    onClick={() => changeCurrentChat(index, contact)}
                                                    key={index}>
                                                    <img src={`${contact.avatarImage}`}
                                                        alt='avatar' className='h-2/12 w-2/12 md:h-4/12 md:w-4/12 rounded-lg mr-6' ></img>
                                                    <div className='username'>
                                                        <div className='text-lg md:text-xl overflow-hidden'>{contact.username}</div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })

                                }
                            </div>
                        </>
                    )
                }
            </div>
            <div className='md:hidden bg-green-500 absolute top-3 right-4 p-3 rounded-md' onClick={(e) => contactHandler(e)}>
                <button className='text-2xl'><i class="bi bi-person-lines-fill"></i></button>
            </div>
            <div ref={contactRef} className='rounded-r-lg w-8/12 sm:w-6/12 bg-blue-500 md:hidden hidden h-screen absolute flex flex-col transition-all ease-in-out justify-between overflow-scroll hover:overflow-scroll'>
                {
                    currentUserName && currentUserImage && (
                        <>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='flex-none flex h-6/12 w-6/12 md:flex-shrink-1 cursor-not-allowed py-3 m-2 p-2 justify-center md:sticky md:top-0 bg-blue-950 items-center'>
                                    <img src={`${currentUserImage}`}
                                        style={{ borderRadius: "50%" }}
                                        alt='avatar' className='h-8/12 w-8/12 animate-pulse' ></img>
                                </div>
                                {
                                    contacts.map((contact, index) => {
                                        return (
                                            <>
                                                <div
                                                    className={`contact cursor-pointer bg-white/10 flex items-center flex-shrink-1 justify-start  m-2 p-2 ${index === currentSelected ? "rounded-md bg-white/50 shadow-2xl shadow-black " : ""}`}
                                                    onClick={() => changeCurrentChat(index, contact)}
                                                    key={index}>
                                                    <img src={`${contact.avatarImage}`}
                                                        alt='avatar' className='h-2/12 w-2/12 md:h-4/12 md:w-4/12 rounded-lg mr-6' ></img>
                                                    <div className='username'>
                                                        <div className='text-lg md:text-xl overflow-hidden'>{contact.username}</div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })

                                }
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Contacts