import React, { useState } from 'react';
import {TextField, Button, InputLabel, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditTask({ tasks, handleDelete, handleUpdateTask, currKey, setEditMode }) {
    const [editTaskText, setEditTaskText] = useState("");
    console.log(`This is curr key ${currKey}`)
    return (
        <>
            <Typography> Edit Mode </Typography>
            <Typography> {tasks[currKey].timestamp}</Typography>
            <InputLabel>{`Current text : ${tasks[currKey].task_message}`}</InputLabel>
            <TextField
                size='small'
                disabled={tasks.length === 9}
                value={editTaskText}
                onChange={(e) => (e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleUpdateTask(editTaskText, currKey, tasks);
                    }
                }}
            />
            <Button onClick={() => handleUpdateTask(editTaskText, currKey, tasks)}><SaveIcon>Save</SaveIcon></Button>
            <Button onClick={() => setEditMode(false)}><CancelIcon>Cancel</CancelIcon></Button>
            <Button onClick={() => handleDelete(currKey) && setEditMode(false)}><DeleteIcon>Delete</DeleteIcon></Button>
        </>
    );
}
