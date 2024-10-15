import React, { useState } from 'react'
import { Logo, AddContact } from "./index.js"
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import authService from '../Services/AuthService.js';
import { logout } from '../store/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { setCurrentChat, removeFriendChat, logoutChat, setCurrentMessages } from '../store/slices/chatSlice.js';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const Contacts = () => {

  const [section, setSection] = useState('contact'); // contact --> contact Message, channel ---> channels
  const user = useSelector((state) => state.user.userInfo);
  const currentChatUser = useSelector((state) => state.chat.currChatUser);
  const friendChats = useSelector((state) => state.chat.friendChats);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await authService.logout();
      if (!result.data) {
        // error
        const { response: { data: { message } } } = result;
        toast.error(message);
      }
      else {
        // success
        const { data: { message } } = result;
        toast.success(message);
        dispatch(logoutChat());
        dispatch(logout());
        navigate('/auth');
      }
    } catch (error) {
      toast.error('Cannot Logout! Try Again Later !');
      return;
    }
  }

  const handleEditProfile = () => {
    navigate('/profile');
  }

  const deleteChat = (id) => {
    dispatch(removeFriendChat(id));
    if (currentChatUser?._id == id) {
      dispatch(setCurrentChat(null));
      dispatch(setCurrentMessages([]));
    }
  }

  const setSectionHandler = (sec) => {
    setSection(sec);
  }

  return (
    <div className=' min-h-screen p-2 text-white font-raleway'>
      <Logo />
      <header className='font-raleway mt-2 rounded-md grid md:grid-cols-2'>
        <div className={`border-2 ${section == "contact" ? "border-[#33FFFF]" : "border-slate-700"}  text-xs md:text-xl text-center text-wrap p-2 cursor-pointer hover:bg-slate-900 duration-100 transition-all  hover:border-[#33FFFF] rounded-md`} onClick={() => { setSectionHandler("contact") }}>
          <ChatIcon sx={{
            fontSize: "1.5rem"
          }} /> Direct Chats
        </div>
        <div className={`border-2 ${section == "channel" ? "border-[#33FFFF]" : "border-slate-700"} text-xs md:text-xl text-center text-wrap p-2 cursor-pointer hover:bg-slate-900 duration-100 transition-all hover:border-[#33FFFF] rounded-md`} onClick={() => { setSectionHandler("channel") }}
        >
          <GroupIcon sx={{
            fontSize: "1.5rem"
          }}
          />
          Channels
        </div>
      </header>
      <div className='flex justify-end px-2 py-2'>
        <AddContact text={section === 'contact' ? "Contact" : "Channel"} />
      </div>
      <section className='contacts-section overflow-y-scroll md:h-[65vh] h-[56vh]' style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}>
        <List className='text-white gap-6 flex flex-col'>
          {friendChats.length ?
            friendChats.map((item) => (
              <ListItem disableGutters key={item._id}
                sx={{
                  height: "40px",
                }}>
                <ListItemButton
                  onClick={() => {
                    dispatch(setCurrentChat(item))
                    if (window.innerWidth <= "890")
                      navigate('/messageContainer')
                  }}
                >
                  <ListItemAvatar>
                    <Avatar className='border-2'>
                      <img src={item.imageUrl} alt="Profile-pic" className='bg-cover h-full w-full' />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.firstName} ${item.lastName}`}
                  />
                </ListItemButton>
                <Tooltip
                  title={`Remove Chat`}
                  arrow={true}
                  placement='top'
                  onClick={() => { deleteChat(item._id) }}
                >
                  <IconButton>
                    <DeleteIcon sx={{
                      color: "white",
                    }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))
            :
            <h1 className='text-center font-bold mt-2'>No Contacts...</h1>
          }
        </List>
      </section>
      <section className='user-profile z-20 bg-slate-700 h-16 rounded-md flex justify-between items-center p-2'>
        <div className='flex items-center gap-2 font-bold text-xl'>
          <img src={user.imageUrl} alt="Profile-Image" className='h-10 w-10 rounded-full' />
          <p>{user.firstName}</p>
        </div>
        <div className='flex items-center gap-3 font-bold text-xl p-2 '>
          <span onClick={handleEditProfile}>
            <EditIcon className='text-[#33FFFF] cursor-pointer' sx={{
              fontSize: "1.6rem"
            }} />
          </span>
          <span onClick={handleLogout}>
            <LogoutIcon className='text-[#33FFFF] cursor-pointer' sx={{
              fontSize: "1.6rem"
            }} />
          </span>
        </div>
      </section>
    </div>
  )
}

export default Contacts
