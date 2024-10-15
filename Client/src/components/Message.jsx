import React from 'react'

const Message = ({ msg , className}) => {
    return (
        <>
            <div className={className}>
                {msg}
            </div>
            {/* <span className='text-sm text-right block mt-1'>12:10 AM</span> */}
        </>

    )
}

export default Message
