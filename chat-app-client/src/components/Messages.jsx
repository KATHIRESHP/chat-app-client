import React from 'react'

const Messages = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => {
        return (
          <div className={`flex ${msg.fromSelf ? " justify-end" : " justify-start"}`} key={index}>
            <div className="rounded-md bg-blue-950 mx-3 my-1 px-4 py-1 text-lg">
              {
                msg.message
              }
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Messages