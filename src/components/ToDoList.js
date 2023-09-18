import {useState} from 'react'
import {Stack, Typography, Button, TextField, Box, Checkbox} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditTask from './EditTask';

export default function ToDoList() {
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedKey, setSelectedKey] = useState(-1);

    const processTimeStamp = () => {
        const currentDate = new Date();

        const month = currentDate.toLocaleString('default', { month: 'long' });
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();

        const formattedDate = `Created: ${month} ${day}, ${year} - ${hour}:${minute.toString().padStart(2, '0')}`;
        return formattedDate;
    };


    const handleAddTask = () => {
        if (taskText.trim() !== '') {

            const taskData = {
                'timestamp': processTimeStamp(),
                'task_message': taskText,
            };

            setTasks([...tasks, taskData]);
            setTaskText('');
        }
    };

    const handleDeleteTask = (selectedKey) => {
        const updatedTasks = tasks.filter((_, key) => key !== selectedKey);
        setTasks(updatedTasks);
        setSelectedKey(-1);
    };

    const handleUpdateTask = (newTaskText, selectedKey, tasks) => {
        const taskData = {
            'timestamp': `Updated: ${processTimeStamp()}`,
            'task_message': newTaskText,
        };

        const updatedTasks = tasks.map((prevTask, key) =>
            key === selectedKey ? taskData : prevTask
        );

        setTasks(updatedTasks);
        setTaskText('');
        setEditMode(false);
        setSelectedKey(-1);
    };

    function convertTasksToCSV(tasks) {
        const header = 'Task\n';
        const csv = tasks.map(task => task + '\n').join('');
        return header + csv;
    };

    function exportToCSV() {
        const csvData = convertTasksToCSV(tasks);

        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], {type: 'text/csv'});

        // Create a temporary link element to trigger the download
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'tasks.csv';

        // Trigger the click event on the link to start the download
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(a.href);
    };


    const renderUnit = (tasks) => {

        if (tasks.length <= 0) {
            return (
                <Typography mt={5}>Please add a task!</Typography>
            )
        };

        return (
            <Box>
                {!editMode ? (
                    tasks.map((task, key) => (
                        <Typography key={key} onDoubleClick={() => {
                            setEditMode(true);
                            setSelectedKey(key)
                        }}>
                            <Checkbox/>
                            {task.task_message}
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
                    <EditTask
                        tasks={tasks}
                        handleDelete={handleDeleteTask}
                        handleUpdateTask={handleUpdateTask}
                        currKey={selectedKey}
                        setEditMode={setEditMode}
                    />
                )}
            </Box>
        );
    };

    return (
        <Box mt={editMode ? 0 : 15}>
            <Box>
                <TextField
                    size='small'
                    style={{visibility: editMode ? 'hidden' : 'visible'}}
                    disabled={editMode || taskText.length > 100 || tasks.length >= 10}
                    label='Enter a task ...'
                    variant='outlined'
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && taskText.trim() !== "" && tasks.length < 10) handleAddTask()
                    }}
                />
                <Button
                    style={{visibility: editMode ? 'hidden' : 'visible'}}
                    disabled={tasks.length > 9 || editMode === true}
                    onClick={() => handleAddTask()}
                >
                    <AddBoxIcon>Add</AddBoxIcon>
                </Button>
            </Box>

            <Stack>
                {renderUnit(tasks)}
            </Stack>
            <Button
                onClick={exportToCSV}
                style={{visibility: editMode ? 'hidden' : "visible"}}
                disabled={editMode === true}
            >
                Export to CSV
            </Button>
        </Box>
    );
};