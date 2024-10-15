
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


const NewChannelDialog = ({ open, onClose }) => {
    return (
        <>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle className='bg-slate-700 text-white'>Create New Channel</DialogTitle>
                <List sx={{ pt: 0 }} className='bg-slate-700 text-white'>
                    {/* {emails.map((email) => (
                        <ListItem disableGutters key={email}>
                            <ListItemButton onClick={() => handleListItemClick(email)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItemButton>
                        </ListItem>
                    ))} */}
                    <ListItem>
                        <ListItemText primary="New Channel" />
                    </ListItem>
                </List>
            </Dialog>
        </>
    )
}

export default NewChannelDialog
