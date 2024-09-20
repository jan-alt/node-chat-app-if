// import { Box, Typography } from '@mui/material'
// import React from 'react'

// const Welcome = ({ user }) => {
//     return (
//         <Box width={'100%'} display={'flex'} alignItems='center' justifyContent='center'>
//             <Typography variant='h3'>
//                 Welcome, {user?.username}
//             </Typography>
//         </Box>
//     )
// }

// export default Welcome

import { Box, Typography, Avatar, Button } from '@mui/material';
import { deepPurple, lightBlue } from '@mui/material/colors';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import React from 'react'

const Welcome = ({ user }) => {
    return (
        <Box 
            width={'100%'} 
            display={'flex'} 
            alignItems='center' 
            justifyContent='center' 
            flexDirection='column'
            sx={{
                backgroundColor: lightBlue[700],
                p: 4,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center'
            }}
        >
            {/* User Avatar */}
            <Avatar 
                sx={{
                    width: 100,
                    height: 100,
                    bgcolor: deepPurple[500],
                    mb: 2,
                    boxShadow: 2
                }}
            >
                {user?.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>

            {/* Welcome Message */}
            <Typography variant='h3' color='white' sx={{ fontWeight: 'bold', mb: 2 }}>
                Welcome, {user?.username}!
            </Typography>

            {/* Animated Icon */}
            <EmojiEmotionsIcon sx={{ fontSize: 50, color: 'yellow', animation: 'bounce 2s infinite' }} />

            {/* Motivational Tagline */}
            <Typography variant='h6' color='white' sx={{ mt: 2, mb: 4 }}>
                Ready to make the most of your day?
            </Typography>

            {/* CTA Button */}
            <Button variant='contained' color='secondary' size='large' sx={{ borderRadius: 5 }}>
                Explore Now
            </Button>
        </Box>
    );
};

export default Welcome;
