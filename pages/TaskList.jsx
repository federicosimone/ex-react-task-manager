import { useTasks } from "../src/context/TaskContext";
import TaskRow from "../components/TaskRow";

function TaskList() {

    const { tasks } = useTasks();

    return (
        <div className="mt-3">
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
                        return <TaskRow key={task.id}
                            title={task.title}
                            status={task.status}
                            createdAt={task.createdAt} />
                    })}

                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
