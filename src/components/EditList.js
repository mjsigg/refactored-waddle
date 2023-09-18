import React, { useState } from 'react';
import {TextField, Button, InputLabel, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function EditList({ tasks, handleDelete, handleUpdateTask, currKey, setEditMode }) {
    const [editedTaskText, setEditedTaskText] = useState("");
    console.log(`This is curr key ${currKey}`)
    return (
        <>
            <Typography> Edit Mode </Typography>
            <InputLabel>{`Current text : ${tasks[currKey]}`}</InputLabel>
            <TextField
                size='small'
                disabled={tasks.length === 9}
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleUpdateTask(editedTaskText, currKey, tasks);
                    }
                }}
            />
            <Button onClick={() => handleUpdateTask(editedTaskText, currKey, tasks)}><SaveIcon>Save</SaveIcon></Button>
            <Button onClick={() => setEditMode(false)}><CancelIcon>Cancel</CancelIcon></Button>
        </>
    );
}
