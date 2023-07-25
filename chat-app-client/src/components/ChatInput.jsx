import React, { useEffect, useState } from 'react'
import Picker, { Emoji } from 'emoji-picker-react'

const ChatInput = ({ handleSendMsg, currentChat }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const emojiHandler = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emoji, e) => {
        console.log(emoji.emoji);
        const Emoji = emoji.emoji + "";
        setMsg((prev) => prev + Emoji);
    }

    const handleMsg = (e) => {
        setMsg(e.target.value);
    }

    useEffect(() => {
        setMsg('');
    }, [currentChat])

    const sendMsg = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <div className='bottom-0 fixed' style={{width: "80%"}}>
            {
                showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
            }
            <div className='flex w-full'>
                <button
                    className={`text-3xl ${showEmojiPicker ? "bg-red-500" : "bg-yellow-400"} px-3 py-1 rounded-sm`}
                    onClick={() => emojiHandler()}>
                    {
                        showEmojiPicker ?
                            <i class="bi bi-x-lg"></i>
                            :
                            <i class="bi bi-emoji-smile"></i>
                    }
                </button>
                <form className='flex-1 flex '>
                    <input className='w-full focus: bg-slate-600 p-2 bg-transparent border-none focus:border-transparent focus:outline-none text-white text-xl justify-center' type='text' placeholder='Type your text here...' value={msg} onChange={handleMsg} />
                </form>
                <button
                 className='text-3xl bg-green-600 px-4 py-1 rounded-l-xl'
                    onClick={(e) => sendMsg(e)}><i class="bi bi-send-fill"></i></button>
            </div>
        </div>
    )
}

export default ChatInput