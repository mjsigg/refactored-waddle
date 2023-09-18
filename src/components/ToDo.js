import { useState } from 'react'
import { Typography, Box } from '@mui/material';
import ToDoList from './ToDoList';

export default function ToDo() {
    const [greeting, setGreeting] = useState("");
    
    return (
        <>
            <Box mt={10} marginLeft={75}>
                <Typography>
                    { greeting === "".trim() ? "Greetings, stranger.": greeting }
                </Typography>
                <ToDoList />
            </Box>
        </>
    )
}

