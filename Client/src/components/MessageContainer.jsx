import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import chatService from '../Services/ChatService.js';
import { toast } from 'react-toastify';
import { setCurrentMessages } from '../store/slices/chatSlice.js';
import { Message } from "./index.js"

const MessageContainer = () => {
  const user = useSelector((state) => state.user.userInfo);
  const currentChatUser = useSelector((state) => state.chat.currChatUser);
  const currentChatMessages = useSelector((state) => state.chat.currChatMessages);
  const dispatch = useDispatch();
  const messageEndRef = useRef();
  const [currDate, setCurrDate] = useState("");
  const dateMap = new Map();

  useEffect(() => {
    if (currDate) console.log(currDate.current)
  }, [currDate])

  useEffect(() => {
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    scrollToBottom();
  }, [currentChatMessages])

  useEffect(() => {
    if (currentChatUser) {

      const getAllChats = async () => {
        try {
          const result = await chatService.getChats(user._id, currentChatUser._id)

          if (result.data) {
            // success
            const { data: { chatMessages } } = result;
            dispatch(setCurrentMessages(chatMessages));
          }
          else {
            // error
            const { response: { data: { message } } } = result;
            toast.error(message);
          }
        } catch (error) {
          console.log(error)
          toast.error("Cannot fetch messages !")
        }
      }
      getAllChats();
    }
  }, [currentChatUser])

  const sendDate = (message) => {
    const messageDate = new Date(message.createdAt).toLocaleDateString();
    if (currDate === "" || currDate !== messageDate) {
      setCurrDate(messageDate);
      return (
        <div className="text-center p-2 text-xl text-red-500">
          {messageDate}
        </div>
      );
    }

    return null;
  };


  return (
    <div className='overflow-y-scroll srollbar-hidden p-10 h-[80vh] bg-slate-800'
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>
      {
        currentChatMessages.length ?
          // <div className='flex flex-col gap-5'>
          //   {
          //     currentChatMessages.map((item) =>
          //       <div className={`${item.sender == user._id ? "self-end" : "self-auto"} min-w-[5rem] max-w-[16rem] flex-wrap`}>
          //         <div key={item._id}
          //           className={`text-justify p-2 ${item.sender == user._id ? "bg-[#F5004F]" : "bg-[#FF6961]"} font-semibold rounded-md`}
          //         >
          //           <Message
          //             msg={item.content}
          //           />
          //         </div>
          //         <div
          //           className={`${item.sender == user._id ? "self-end" : "self-start"} text-xs text-right`}
          //         >
          //           12:10
          //         </div>
          //       </div>
          //     )
          //   }
          //   <div ref={messageEndRef} />
          // </div>
          <div>
            {
              currentChatMessages.map((item) => {

                const messageDate = new Date(item.createdAt).toLocaleDateString('en-us', { month: "short", day: "numeric", year: "numeric" })
                let date = null;
                if (!dateMap.get(messageDate)) {
                  dateMap.set(messageDate, 1);
                  date = messageDate;
                }

                return (
                  <div key={item._id} className='my-3'>
                    {
                      date &&
                      <div className='text-center p-2 text-xs sm:text-sm md:text-xl text-white h-10 w-full my-3 flex justify-center items-center'>
                        <span className='border-2 p-2 bg-slate-500'>
                          {date}
                        </span>
                      </div>
                    }
                    <div className={`flex items-center ${item.sender == user._id ? "justify-end" : "justify-start"}`}>
                      {
                        item.content ? <Message msg={item.content} className={`text-justify p-2 ${item.sender == user._id ? "bg-[#ff5087]" : "bg-[#ff2a1f]"} font-semibold rounded-md max-w-[16rem] min-w-[5rem] text-xs sm:text-sm md:text-xl`} /> :
                          <div
                            className={`p-2 border-2 font-semibold rounded-md max-w-[16rem] min-w-[5rem] text-xs sm:text-sm md:text-xl`}
                          >
                            <a href={item.fileUrl} target='_blank'>
                              <img
                                src={item.fileUrl}
                                alt="fileImage"
                                className='h-[10rem] w-[15rem]'
                                onError={(event) => {
                                  console.log(item.fileUrl)
                                  event.target.setAttribute('src', "https://pnghq.com/wp-content/uploads/folder-png-transparent-background.png");
                                }}
                              />
                            </a>
                            <span className='text-sm'>Click to View the File</span>
                          </div>
                      }
                      {/* <Message msg={item.content ? item.content : item.fileUrl} className={`text-justify p-2 ${item.sender == user._id ? "bg-[#ff5087]" : "bg-[#ff2a1f]"} font-semibold rounded-md max-w-[16rem] min-w-[5rem] text-xs sm:text-sm md:text-xl`} /> */}
                      {/* FF6961 receiver*/}
                      {/* f5004f  sender*/}
                    </div>
                    <div className={`flex items-center ${item.sender == user._id ? "justify-end" : "justify-start"} text-xs sm:text-sm md:text-xl`}>
                      {
                        new Date(item.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            <div ref={messageEndRef} />
          </div>
          :
          <>
            <h1>Start To Chat by typing something !</h1>
          </>
      }
    </div>
  )
}


export default MessageContainer

