import Modal from "./Modal"
import { useState, useEffect, useRef } from "react"

function EditTaskModal({
    show,
    onClose,
    task,
    onSave

}

) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("To do")

    useEffect(() => {

        if (task) {
            setTitle(task.title)
            setDescription(task.description)
            setStatus(task.status)
        }

    }, [task])

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!task) return
        onSave({
            ...task,
            title,
            description,
            status
        })
        alert("Task modificata correttamente")
    }

    const formRef = useRef(null)

    return (
        <><div id="modal-root">
            <Modal
                title="Modifica Task"
                show={show}
                onClose={onClose}
                confirmText="Salva"
                onConfirm={() => formRef.current.requestSubmit()}
                content={
                    <div className="mt-3" style={{ width: "18rem" }}>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <label>Modifica titolo</label>
                            <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>

                            <label >Description</label>
                            <textarea className="form-control" name="description" rows="2" placeholder="Add a description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            <label>Status</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option className="bg-danger" value="To do">To do</option>
                                <option className="bg-warning" value="Doing">Doing</option>
                                <option className="bg-success" value="Done">Done</option>
                            </select>
                        </form>
                    </div>
                }
            />
        </div>
        </>
    )
}

export default EditTaskModal