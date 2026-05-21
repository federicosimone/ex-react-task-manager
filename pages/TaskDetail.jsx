import { useParams } from "react-router-dom";
import { useTaskContext } from "../src/context/TaskContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import EditTaskModal from "../components/EditTaskModal";

function TaskDetail() {

    const navigate = useNavigate()

    const { tasks, removeTask, updateTask } = useTaskContext()

    const { id } = useParams()

    console.log(tasks)
    console.log(id)

    const [showModal, setShowModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)

    const task = tasks.find(task => task.id === Number(id))

    if (!task) {
        return <p>Loading...</p>
    }



    return (
        <>
            <EditTaskModal
                show={showEdit}
                task={selectedTask}
                onClose={() => setShowEdit(false)}
                onSave={(updatedTask) => {
                    updateTask(updatedTask); // dal context
                    setShowEdit(false);
                }}
            />

            <div className="mt-3 card p-2" >
                <Modal                                               //importo la modale nel nel componente padre, all'interno dell'elemento html che ho creato come root. 
                    title="Cancella task"                            // il collegamento avvienne tramite l'id="modal-root"
                    content="Sei sicuro di voler eliminare la task?"
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={async () => {         //uso l'async/await perchè devo attendere che si svolga la chiamata fetch, prima di svolgere la funzione removeTask
                        await removeTask(task.id)
                        setShowModal(false)
                        navigate('/tasklist');     //navigate mi permette di cambiare pagina in seguito ad un evento (come una funzione) 
                    }}
                />
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
                    <button className="btn btn-danger" onClick={() => setShowModal(true)}>Elimina </button>
                    <button className="btn ms-2 btn-warning" onClick={() => {
                        setSelectedTask(task);
                        setShowEdit(true);
                    }}>
                        Modifica Task
                    </button>

                </div>
            </div>

        </>
    )
}

export default TaskDetail