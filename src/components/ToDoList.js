import { useState } from 'react'
import { Stack, Typography, Button, TextField, Box, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditList from './EditList';

export default function ToDoList() {
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedKey, setSelectedKey] = useState(-1);

    const handleAddTask = () => {
      if (taskText.trim() !== '') {
        setTasks([...tasks, taskText]);
        setTaskText('');
      }
    };

    const handleDeleteTask = (selectedKey) => {
        const updatedList = tasks.filter((_, key) => key !== selectedKey);
        setTasks(updatedList);
        setSelectedKey(-1);
    };

    const handleUpdateTask = (newTaskText, selectedKey, tasks) => {
        const updatedTasks = tasks.map((prevTask, key) =>
            key === selectedKey ? newTaskText : prevTask
        );

        setTasks(updatedTasks);
        setTaskText('');
        setEditMode(false);
        setSelectedKey(-1);
    };
    console.log(selectedKey)
    const renderUnit = (tasks) => {

        if (tasks.length <= 0) {
            return (
                <Typography mt={5}>Please add a task!</Typography>
            )
        };
    
        return (
            <Box>
                {!editMode ? (
                    tasks.map((taskText, key) => (
                        <Typography key={key} onDoubleClick={() => {setEditMode(true); setSelectedKey(key)}}>
                            <Checkbox />
                            {taskText}
                            <Button
                                onClick={() => {
                                    setSelectedKey(key);
                                    setEditMode(true);
                                }}
                            >
                                <EditIcon>Edit</EditIcon>
                            </Button>
                            <Button
                                onClick={() => handleDeleteTask(key)}
                                disabled={tasks.length === 0}
                            >
                                <DeleteIcon>Delete</DeleteIcon>
                            </Button>
                        </Typography>
                    ))
                ) : (
                    <EditList
                        tasks={tasks}
                        handleDelete={handleDeleteTask}
                        handleUpdateTask={handleUpdateTask}
                        currKey={selectedKey}
                        setEditMode={setEditMode}
                    />
                )}
            </Box>
        );
    }   
    
    return(
        <Box mt={editMode ? 0 : 15}>
            <Box>
                <TextField
                    size='small'
                    style={{ visibility: editMode ? 'hidden' : 'visible' }}
                    disabled={editMode || taskText.length > 100 || tasks.length >= 10}
                    label='Enter a task ...'
                    variant='outlined'
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter' && taskText.trim() !== "" && tasks.length < 10) handleAddTask()}}
                />
                <Button
                    style={{ visibility: editMode ? 'hidden' : 'visible' }}
                    disabled={tasks.length > 9 || editMode === true}
                    onClick={() => handleAddTask()}
                >
                    <AddBoxIcon>Add</AddBoxIcon>
                </Button>
            </Box>

            <Stack>
                {renderUnit(tasks)}
            </Stack>
        </Box>
    );
}