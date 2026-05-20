import { createContext, useEffect, useState, useContext } from "react";


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


    const addTask = async (taskData) => {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });
        const data = await res.json();

        if (data.success) {
            setTasks(prev => [...prev, data.task]);
        } else {
            throw new Error(data.message);
        }
    }

    const removeTask = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`, {
            method: "DELETE"
        })

        const data = await res.json()

        if (data.success) {
            setTasks(prev => prev.filter(task => task.id !== id))
            alert("Task eliminata con successo")
        } else {
            throw new Error(alert(data.message))

        }



    };



    const updateTask = () => { };

    return { tasks, addTask, removeTask, updateTask }
}

function TaskProvider({ children }) {
    const taskData = useTasks()
    return (
        <TaskContext.Provider value={taskData}>
            {children}
        </TaskContext.Provider>
    );


};
function useTaskContext() {
    return useContext(TaskContext);
}



export { TaskProvider, useTaskContext } //esportando l'hook custom , nei componenti posso accedere a tasks e alle funzioni crud 
