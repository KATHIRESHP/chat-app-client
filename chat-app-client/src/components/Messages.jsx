import React from 'react'

const Messages = ({ messages, uuidv4, scrollRef }) => {
  return (
    <div className='bg-wallpaper min-h-full mb-11 bg-fixed bg-cover bg-center relative'>
      <div className='text-green-600 flex justify-center sticky top-2 md:top-3 lg:top-5 w-full'>
        <div className='bg-slate-700 px-3 md:px-5 py-2 text-sm md:text-base rounded-md'><span className='mr-3'><i class="bi bi-file-lock2"></i></span>end-to-end encrypted</div>
      </div>
      {messages.map((msg, index) => {
        return (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`flex ${msg.fromSelf ? " justify-end" : " justify-start"}`} key={index}>
              <div className="rounded-md bg-blue-950 mx-3 my-1 px-4 py-1 text-lg">
                {
                  msg.message
                }
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages