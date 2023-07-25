import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

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
    return (
        <>
            {
                currentUserName && currentUserImage && (
                    <>
                        <div className='w-3/12 h-screen flex flex-col transition-all ease-in-out justify-between overflow-scroll hover:overflow-scroll'>
                            <div>
                                <div className='flex flex-shrink-1 cursor-not-allowed py-3 m-2 p-2 justify-center sticky top-0 bg-blue-950 items-center'>
                                    <img src={`${currentUserImage}`}
                                    style={{borderRadius: "50%", height: "100px", width: "100px"}}
                                        alt='avatar' className='h-8/12 w-8/12 animate-pulse' ></img>
                                </div>
                                {
                                    contacts.map((contact, index) => {
                                        return (
                                            <>
                                                <div
                                                    className={`contact cursor-pointer bg-white/10 flex flex-shrink-1 justify-start items-center m-2 p-2 ${index === currentSelected ? "rounded-md bg-white/50 shadow-2xl shadow-black " : ""}`}
                                                    onClick={() => changeCurrentChat(index, contact)}
                                                    key={index}>
                                                    <img src={`${contact.avatarImage}`}
                                                        alt='avatar' className='h-3/12 w-3/12 mr-6' ></img>
                                                    <div className='username'>
                                                        <div className='text-lg md:text-xl'>{contact.username}</div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })

                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Contacts