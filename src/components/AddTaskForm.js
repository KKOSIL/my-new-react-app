import React, { useState } from 'react';
//import './AddTaskForm.css';

function AddTaskForm({ columnId, onAddTask }) { 
  const [newTaskTitle, setNewTaskTitle] = useState('');

  return (
    <div className="add-task-form">
      <input
        type="text"
        placeholder="+ Add task"
        className="add-task-input"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && newTaskTitle.trim() !== '') { 
            e.preventDefault(); 

            onAddTask(newTaskTitle.trim(), columnId); 
            setNewTaskTitle('');
          }
        }}
        // ----------------------------------------------------------------------
      />
    </div>
  );
}

export default AddTaskForm;