import { ListItem,Box, Button, TextField, Typography, Paper, List } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { blue, indigo } from '@mui/material/colors';
import {io} from 'socket.io-client'
import api from '../config/api';
import { useUser } from '../context/userContext';
import autoScroll from '../../utility/autoScroll';

const ChatArea = ({ selectedUser }) => {

    const {user} = useUser()

    const socket = io('http://localhost:5000')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const handleSend = () => {
        socket.emit('message', { yourId: user._id, partnerId: selectedUser._id, message })
        setMessage('')
    }

    // useEffect(() => {
    //     socket.emit('create-room', { yourId: user._Id, partnerId: selectedUser._id })
    //     api.get(`/messages/${user._id}/${selectedUser._id}`).then(res => {
    //         setMessages(res.data.messages)})
    // }, [])

    useEffect(() => {
        socket.emit('create-room', { yourId: user._id, partnerId: selectedUser._id });
        api.get(`/messages/${user._id}/${selectedUser._id}`)
            .then(res => setMessages(res.data.messages));
    }, [user._id, selectedUser._id]); 

    useEffect(() => {
        const handleMessage = (message) => {
            setMessages(prevMessages => [...prevMessages, message])}; // Using functional update
        socket.on('list_message', handleMessage);
    }, [socket]);

    return (
        <Box width={'100%'} sx={{  background: blue[900], color: 'white', borderRadius: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* header */}
            <Typography variant='h5' sx={{ p: 2, background: blue[800], borderRadius: '8px 8px 0 0', color: 'white' }}>
                {selectedUser.username}
            </Typography>
            {/* chat area */}
            {/* <Box sx={{ background: blue[100], p: 2, flex: 1, overflowY: 'auto', height: '100%' }}> */}
            <Box sx={{ background: blue[100], p: 2, flex: 1, height: '100%' }}>
                {/* <Typography sx={{ background: blue[900], px: 2, py: 1, color: 'white', borderRadius: 2, width: 'fit-content' }} variant='body2'>
                    Hello,
                </Typography>
                <Typography sx={{ background: indigo[600], px: 2, ml: 'auto', py: 1, color: 'white', borderRadius: 2, width: 'fit-content', mt: 1 }} variant='body2'>
                    awefawefawefawe
                </Typography> */}

                <List sx={styles.messageList}>
                    {
                        messages.map(msg => (
                            <ListItem key={msg._id} sx={msg.sender === user._id ? styles.messageSent : styles.messageReceived}>
                                <Paper sx={msg.sender === user._id ? styles.messagePaperSent : styles.messagePaper}>
                                    <Typography>{msg.message}</Typography>
                                </Paper>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
            {/* input & send button */}
            <Box display='flex' sx={{ background: 'white', p: 1, borderRadius: '0 0 8px 8px' }}>
                <TextField onChange={e => setMessage(e.target.value)} value={message} fullWidth placeholder='Send message...' sx={{ mr: 2, borderRadius: 1 }} />
                <Button onClick={handleSend} variant='contained' sx={{ background: indigo[500], color: 'white', borderRadius: 1 }}>Send</Button>
            </Box>
        </Box>
    );
};

const styles = {
    chatContainer: {
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
    },
    chatHeader: {
        padding: '10px',
        backgroundColor: '#1976d2',
        color: 'white',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        textAlign: 'center',
    },
    chatMessages: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: '#fff',
    },
    messageList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        maxHeight: '100%', overflowY: 'auto'
    },
    messageReceived: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '10px',
    },
    messageSent: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    },
    messagePaper: {
        padding: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        maxWidth: '70%',
    },
    messagePaperSent: {
        padding: '10px',
        backgroundColor: '#1976d2',
        color: 'white',
        borderRadius: '10px',
        maxWidth: '70%',
    },
    chatInput: {
        display: 'flex',
        padding: '10px',
        backgroundColor: '#f1f1f1',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
    },
    textField: {
        marginRight: '10px',
    },
    sendButton: {
        alignSelf: 'center',
    },
};

export default ChatArea;
