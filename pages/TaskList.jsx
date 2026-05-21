import { useTaskContext } from "../src/context/TaskContext";
import TaskRow from "../components/TaskRow";
import { useState, useMemo } from "react";

function TaskList() {

    const { tasks } = useTaskContext();

    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const sortedTasks = useMemo(() => {
        const tasks2 = [...tasks]

        return tasks2.sort((a, b) => {
            let result = 0;
            if (sortBy === "title") {
                result = a.title.localeCompare(b.title)
            }
            if (sortBy === "status") {
                const order = { "To do": 1, "Doing": 2, "Done": 3 };
                result = order[a.status] - order[b.status];
            }

            if (sortBy === "createdAt") {
                result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return result * sortOrder;
        });
    }, [tasks, sortBy, sortOrder]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };


    return (
        <div className="mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"><button className="btn" onClick={() => handleSort("title")}>Titolo</button></th>
                        <th scope="col"><button className="btn" onClick={() => handleSort("status")}>Stato</button></th>
                        <th scope="col"><button className="btn" onClick={() => handleSort("createdAt")}>Data di Creazione</button></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task => {
                        return <TaskRow key={task.id}
                            id={task.id}
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
