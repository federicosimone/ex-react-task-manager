import { useParams } from "react-router-dom";
import { useTaskContext } from "../src/context/TaskContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TaskDetail() {

    const navigate = useNavigate()

    const { tasks, removeTask } = useTaskContext()

    const { id } = useParams()

    console.log(tasks)
    console.log(id)

    const task = tasks.find(task => task.id === Number(id))

    if (!task) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="mt-3 card p-2">
                <div className="d-flex justify-content-between">
                    <div className="card-header">Task N° {task.id}</div>
                    <div><Link className="btn btn-dark" to="/tasklist">Torna alla lista</Link></div>
                </div>
                <div className="card-body">
                    <h5 className=" fw-bold card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className={task.status === "To do" ? "text-danger" :
                        task.status === "Doing" ? "text-warning" :
                            task.status === "Done" ? "text-success" : ""}>{task.status}</p>
                    <button className="btn btn-danger" onClick={async () => {
                        await removeTask(task.id)
                        navigate('/tasklist');
                    }}>Elimina </button>

                </div>
            </div>
        </>
    )
}

export default TaskDetail