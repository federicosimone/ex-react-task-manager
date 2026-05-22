import { useTaskContext } from "../src/context/TaskContext";
import TaskRow from "../components/TaskRow";
import { useState, useMemo, useCallback } from "react";

function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
};

function TaskList() {

    const { tasks } = useTaskContext();

    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    //const [inputValue, setInputValue] = useState("");

    const [searchQuery, setSearchQuery] = useState("")

    const debouncedSetSearchQuery = useCallback(
        debounce(setSearchQuery, 500)
        , []);

    const sortedAndFilteredTasks = useMemo(() => {   //uso useMemo() per far si che 
        return [...tasks]

            .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

            .sort((a, b) => {
                let result = 0;
                if (sortBy === "title") {
                    result = a.title.localeCompare(b.title)
                } else if (sortBy === "status") {

                    const statusOptions = ["To do", "Doing", "Done"];
                    result = statusOptions.indexOf(a.status) - statusOptions.indexOf(b - status)
                } else if (sortBy === "createdAt") {

                    result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }

                return result * sortOrder;   // moltiplico result per lo stato sortOrder che ho dichiarato 1, in modo da far si  che sortOrder task cambi il segno
            });
    }, [tasks, sortBy, sortOrder, searchQuery]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);  //ordina per "field"
            setSortOrder(1);  //per resettare lo state 
        }
    };


    return (
        <>

            <div className="mt-4">
                <div className="mb-3">
                    <h1 className="fw-bold">Le tue Tasks</h1>
                    <input className="form-control" type="text" placeholder="Cerca una task..." onChange={(e) => {
                        return debouncedSetSearchQuery(e.target.value)
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
                        {sortedAndFilteredTasks.map(task => {
                            return <TaskRow key={task.id}
                                id={task.id}
                                title={task.title}
                                status={task.status}
                                createdAt={new Date(task.createdAt).toLocaleDateString()} />
                        })}

                    </tbody>
                </table>
            </div>
        </>

    );
}

export default TaskList;
