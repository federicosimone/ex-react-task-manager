import { createContext, useEffect, useState } from "react";

//creo il contesto

const TaskContext = createContext(null)

//definisco il custom provider
function useTasks() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks`)
                const data = await response.json()
                console.log(data)
                setTasks(data)
            } catch (err) {
                console.error("Errore nella chiamata API", err)
            }
        }
        fetchData();

    }, []);


    const addTask = () => { };
    const removeTask = () => { };
    const updateTask = () => { };

    return { tasks, addTask, removeTask, updateTask }
}

function TaskProvider({ children }) {
    const tasksData = useTasks()
    return (
        <TaskContext.Provider value={tasksData}>
            {children}
        </TaskContext.Provider>
    );

};



export { TaskProvider, useTasks } //esportando l'hook custom useTasks, nei componenti posso accedere a tasks e alle funzioni crud 
