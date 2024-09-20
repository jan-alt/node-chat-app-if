import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { indigo, blue, blueGrey } from '@mui/material/colors';
import { useUser } from '../context/UserContext';

const ListOfUsers = ({ users, setSelectedUser }) => {
    const {logout} = useUser()
    return (
        <Box xs={12} md={6} padding={2} sx={{ mr: 2, width: 1/4, background: blueGrey[900], color: 'white', borderRadius: 2 }}>
            <Typography variant="h6" component="div">
                Contacts
            </Typography>
            <Box>
                <List dense={true}>
                    {
                        users.map(user => (
                            <ListItem onClick={() => setSelectedUser(user)} key={user._id} sx={{ '&:hover': { background: blue[700] }, borderRadius: 1 }}>
                                <ListItemIcon>
                                    <AccountCircleIcon sx={{ color: indigo[300] }} />
                                </ListItemIcon>
                                <ListItemText primary={user.username} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>

            <Button onClick={logout} sx={{ mt: 'auto', }} variant='contained' fullWidth color='warning'>Logout</Button>
        </Box>
    )
}

export default ListOfUsers