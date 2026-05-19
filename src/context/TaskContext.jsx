import { createContext, useEffect, useState, useContext } from "react";

//creo il contesto

const TaskContext = createContext(null)

//definisco il custom provider

function TaskProvider({ children }) {
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

    }, [])


    return (
        <TaskContext.Provider value={tasks}> {/*attenzione alle graffe, che saranno da riportare tali*/}
            {children}
        </TaskContext.Provider>
    );

};

function useTask() {
    const context = useContext(TaskContext);
    return context;
}

export { TaskProvider, useTask }
