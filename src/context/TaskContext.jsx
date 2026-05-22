import { createContext, useContext } from "react";
//const { VITE_APP_API_URL } = import.meta.env
import useTasks from "../../customHooks/useTasks";

//creo il contesto

const TaskContext = createContext(null)


//definisco il custom provider


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
