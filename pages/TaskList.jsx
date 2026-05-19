import { useTask } from "../src/context/TaskContext";
import TaskRow from "../components/TaskRow";

function TaskList() {

    const tasks = useTask();

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Stato</th>
                    <th scope="col">Data di Creazione</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => {
                    return <TaskRow key={task.id} task={task} />
                })}

            </tbody>
        </table>
    );
}

export default TaskList;

/*<ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                    </li>
                ))}
            </ul>*/