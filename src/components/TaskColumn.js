import React from 'react';
import './TaskColumn.css';
import AddTaskForm from './AddTaskForm';

function TaskColumn({ columnTitle, tasks, onAddTask, onToggleTaskCompleted}) {
  const columnClass = columnTitle.toLowerCase().replace(/\s/g, '-');

  return (
    <div className={`task-column ${columnClass}`}>
      <h3>
        {columnTitle}
        <span className="task-count">{tasks.length}</span>
      </h3>
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}> 
    <input
      type="checkbox"
      checked={task.completed}
      onChange={(e) => onToggleTaskCompleted(task.id)}
    />
    {task.title}
  </div>
))}
      <AddTaskForm columnId={columnTitle} onAddTask={onAddTask} />
    </div>
  );
}

export default TaskColumn;