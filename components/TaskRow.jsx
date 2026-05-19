//import { useTask } from "../src/context/TaskContext"


function TaskRow({ task }) { //passo task come prop per fare il map nel componente padre

    //const tasks = useTask();
    return (
        <>
            <tr>
                <td>{task.title}</td>
                <td className={
                    task.status === "To do" ? "bg-danger" :   //uso ternario concatenato per gestire gli sfondi
                        task.status === "Doing" ? "bg-warning" :
                            task.status === "Done" ? "bg-success" : ""}>
                    {task.status}
                </td>
                <td> {task.createdAt} </td>
            </tr>

        </>
    )
}

export default TaskRow