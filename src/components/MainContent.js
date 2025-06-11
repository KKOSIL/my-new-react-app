import React from 'react';
import './MainContent.css';
import TaskColumn from './TaskColumn';

function MainContent({tasks, onAddTask, onToggleTaskCompleted}) {

  const getStartedTasks = tasks.filter(task => task.status === 'Get Started');
  const requestsBacklogTasks = tasks.filter(task => task.status === 'Requests Backlog');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const approvedTasks = tasks.filter(task => task.status === 'Approved');

  return (
    <main className="main-content">
      <div className="main-header">
        <h2>What's My SERP</h2>
      </div>
      <div className="task-columns">
        <TaskColumn columnTitle="Get Started" tasks={getStartedTasks} onAddTask={onAddTask} onToggleTaskCompleted={onToggleTaskCompleted} />
        <TaskColumn columnTitle="Requests Backlog" tasks={requestsBacklogTasks} onAddTask={onAddTask} onToggleTaskCompleted={onToggleTaskCompleted} />
        <TaskColumn columnTitle="In Progress" tasks={inProgressTasks} onAddTask={onAddTask} onToggleTaskCompleted={onToggleTaskCompleted} />
        <TaskColumn columnTitle="Approved" tasks={approvedTasks} onAddTask={onAddTask} onToggleTaskCompleted={onToggleTaskCompleted} />
      </div>
    </main>
  );
}

export default MainContent;