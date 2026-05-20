//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from '../pages/TaskList';
import DefaultLayout from '../layout/DefaultLayout';
import Homepage from '../pages/Homepage';
import { TaskProvider } from './context/TaskContext';

import './App.css'
import AddTask from '../pages/AddTask';
import TaskDetail from '../pages/TaskDetail';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/tasklist" element={<TaskList />} />
              <Route path="/addTask" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetail />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </TaskProvider>
    </>
  )
}

export default App
