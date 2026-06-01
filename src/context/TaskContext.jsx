import { createContext, useContext } from "react";
//const { VITE_APP_API_URL } = import.meta.env
import useTasks from "../../customHooks/useTasks";

//creo il contesto

const TaskContext = createContext(null)


//definisco il custom provider


function TaskProvider({ children }) {
    const taskData = useTasks()   //sto popolando tasksData con tutto ciò che viene esportato dal useTasks (tasks, addTasks, removeTask..ecc)
    return (
        <TaskContext.Provider value={taskData}>   {/*tutti i figli possono accedere ai dati (taskData) tramite TaskContext.*/}
            {children}
        </TaskContext.Provider>
    );


};
function useTaskContext() {
    return useContext(TaskContext);       // equivale a scrivere const value = useContext(TaskContext) direttamente nel componente
}                                         // Io gli credo un custom hook per avere il codice più pulito nei componenti     



export { TaskProvider, useTaskContext } //esportando l'hook custom , nei componenti posso accedere a tasks e alle funzioni crud 
