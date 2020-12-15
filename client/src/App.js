import React, { useState } from 'react';
import './App.css';
import TodoList from './components/todoList';

function App() {
  return (
    <div className='App'>
      <div className='container widget-container'>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
