//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from '../pages/TaskList';
import DefaultLayout from '../layout/DefaultLayout';
import Homepage from '../pages/Homepage';

import './App.css'
import AddTask from '../pages/AddTask';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Homepage} />
            <Route path="/tasklist" Component={TaskList} />
            <Route path="/addTask" Component={AddTask} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
