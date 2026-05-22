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

    const task = tasks.find(task => task.id === parseInt(id))

    console.log(tasks)
    console.log(id)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)


    if (!task) {
        return <p>Task non trovata</p>
    }


    return (
        <>
            <EditTaskModal
                show={showEditModal}
                task={selectedTask}
                onClose={() => setShowEditModal(false)}
                onSave={(updatedTask) => {
                    updateTask(updatedTask); // dal context
                    setShowEditModal(false);
                }}
            />

            <div className="mt-3 card p-2" >
                <Modal                                               //importo la modale nel nel componente padre, all'interno dell'elemento html che ho creato come root. 
                    title="Cancella task"                            // il collegamento avvienne tramite l'id="modal-root"
                    content="Sei sicuro di voler eliminare la task?"
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={async () => {         //uso l'async/await perchè devo attendere che si svolga la chiamata fetch, prima di svolgere la funzione removeTask
                        await removeTask(task.id)   //funzione di rimozione task 
                        setShowDeleteModal(false)   // setta il show su false in modo da chiuderlo 
                        navigate('/tasklist');     //navigate mi permette di indirizzarmi alla pagina tasklist in seguito ad un evento (in questo caso una funzione) 
                    }}
                />
                <div className="d-flex justify-content-between">
                    <div className="card-header">Task N° {task.id}</div>
                    <div><Link className="btn btn-dark" to="/tasklist">Torna alla lista</Link></div>
                </div>
                <div className="card-body">
                    <h5 className=" fw-bold card-title">Nome: {task.title}</h5>
                    <p className="card-text">Descrizione: {task.description}</p>
                    <p className="card-text">Creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
                    <p className={task.status === "To do" ? "text-danger" :
                        task.status === "Doing" ? "text-warning" :
                            task.status === "Done" ? "text-success" : ""}>{task.status}</p>
                    <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Elimina </button>
                    <button className="btn ms-2 btn-warning" onClick={() => {
                        setSelectedTask(task);
                        setShowEditModal(true);
                    }}>Modifica Task</button>

                </div>
            </div>

        </>
    )
}

export default TaskDetail