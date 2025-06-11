import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title : 'Welcome to your board', status : 'Get Started', completed : false},
    { id: 2, title : 'Pricing page', status : 'Requests Backlog', completed : false },
    { id: 3, title : 'Contact us page', status : 'Requests Backlog', completed : false },
    { id: 4, title : 'Schedule custom reporting', status : 'In Progress', completed : false},
    { id: 5, title : 'Search history for backlinks and keywords', status : 'Approved', completed : false}
  ]);

  const addTask = (title, status) => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    const newTask = {
      id: newId,
      title: title,
      status: status,
      completed : false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskCompleted = (id) =>{
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === id? {...task, completed : !task.completed} : task
      )
    );
  };


  return (
    <div className="App">
      <h1>My Todolist Clone</h1>
      <Sidebar />
      <MainContent tasks={tasks} onAddTask={addTask} onToggleTaskCompleted={toggleTaskCompleted} />
    </div>
  );
}

export default App;
