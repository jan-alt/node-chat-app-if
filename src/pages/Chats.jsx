import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import { useUser } from '../context/UserContext';
import ListOfUsers from '../components/ListOfUsers';
import ChatArea from '../components/ChatArea';
import Welcome from '../components/Welcome';
import api from '../config/api';



const Chats = () => {
    const { user } = useUser();
    const [selectedUser, setSelectedUser] = useState(null)

    // const [users, setUsers] = useState([
    //     { id: 1, username: 'username 1' },
    //     { id: 2, username: 'username 2' },
    // ]);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        api.get('/users').then(res => {
            setUsers(res.data.users)
        })
    }, [])

    return (
        <Box sx={{ background: blue[900], color: 'white', borderRadius: 2, mb: 3 }} display={'flex'} width='80%' m='auto' p={2}>
            {/* list of users */}
            <ListOfUsers users={users} setSelectedUser={setSelectedUser}/>
            {
                selectedUser ?
                    <ChatArea selectedUser={selectedUser} /> :
                    <Welcome user={user} />
            }
        </Box>
    )
};

export default Chats;