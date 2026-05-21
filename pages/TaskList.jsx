import { useTaskContext } from "../src/context/TaskContext";
import TaskRow from "../components/TaskRow";
import { useState, useMemo, useCallback, useEffect } from "react";

function TaskList() {

    const { tasks } = useTaskContext();

    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    console.log(searchQuery)

    const sortedTasks = useMemo(() => {
        const tasks2 = [...tasks]

        const taskFiltered = tasks2.filter(task => {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase())
        })



        return taskFiltered.sort((a, b) => {
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

            return result * sortOrder;   // moltiplico result per lo stato sortOrder che ho dichiarato 1, in modo da far si  che sortOrder task cambi il segno
        });
    }, [tasks, sortBy, sortOrder, searchQuery]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };

    function debounce(callback, delay) {
        let timer
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value);
            }, delay);
        };
    };





    const setQueryDebounced = useCallback(
        debounce(setSearchQuery, 1000)
        , []);





    return (
        <>

            <div className="mt-3">
                <div className="mb-3">
                    <label className=" form-label">Cerca task</label>
                    <input className="form-control" type="text" name="" value={inputValue} onChange={(e) => {
                        const value = e.target.value;
                        setInputValue(value)
                        setQueryDebounced(value)
                    }}></input>
                </div>
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
        </>

    );
}

export default TaskList;
