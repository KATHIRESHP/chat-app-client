import React from 'react'
import robot from '../assets/robot.gif'

const Welcome = ({ currentUser }) => {
    return (
        <div className='w-full text-white flex flex-col justify-evenly items-center'>
            <img
                src={robot}
                className='w-3/6 h-4/6 flex justify-center items-center'>
            </img>
            <div className='flex flex-col justify-center items-center text-xl font-sans'>
                Welcome, <span className='text-3xl text-blue-950 italic'>{`Kathiresh`}</span>
                Select any chat and kickstart
            </div>
        </div>
    )
}

export default Welcome