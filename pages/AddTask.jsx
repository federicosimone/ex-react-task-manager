import { useMemo, useRef, useState } from "react"
import { useTaskContext } from "../src/context/TaskContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\\\",.<>?/`~";

function AddTask() {

    const { addTask } = useTaskContext();

    //per il title
    const [title, setTitle] = useState("")

    //per la textarea
    const RefDescription = useRef("")

    //per select
    const RefStatus = useRef("To do")

    const isTitleValid = useMemo(() => { //utilizo useMemo() perchè mi restituisce una valore (booleano in questo caso) e posso usarlo per le condizioni.
        const containSymbols = title.split("").some(char => {
            return symbols.includes(char.toLowerCase()) //controllo se title contiene un simboli 
        })

        return !containSymbols && title.trim() !== ""; //se NON contiene simboli e NON è una stringa vuota, allora è VALIDO 
    }, [title]) //monitoro title come dipendenza


    const submit = async e => {

        //gestione preventDefault 
        e.preventDefault();

        const description = RefDescription.current.value  //variabili che prendono il valore tramite useRef()
        const status = RefStatus.current.value

        //validazioni:

        //validazione titolo

        if (!isTitleValid) {
            alert("Il titolo non è corretto o vuoto")
            console.error("Titolo errato")
            return
        }

        //invio dati con submit

        const newTask = {
            title,
            description,
            status
        }

        try {
            await addTask(newTask)  //quando la funzione ha terminato 
            alert("Task caricata correttamente")
            setTitle("")
            RefDescription.current.value = ""
            RefStatus.current.value = "To do"
        } catch (errore) {
            console.error("Si è verificato un errore", errore.message)
        }

    }

    return (
        <>
            <div className="mt-3" style={{ width: "18rem" }}>
                <form onSubmit={submit} id="taskForm">
                    <label>Title</label>
                    <input className="form-control mb-1" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    {!isTitleValid ? <p className="text-danger">Il titolo è vuoto o contiene simboli</p> : <p className="text-success">Titolo inserito correttamente</p>}
                    <label >Description</label>
                    <textarea className="form-control" name="description" rows="2" placeholder="Add a description" ref={RefDescription}></textarea>
                    <label>Status</label>
                    <select className="form-select" ref={RefStatus}>
                        <option className="bg-danger" defaultValue={"To do"}>To do</option>
                        <option className="bg-warning" value="Doing">Doing</option>
                        <option className="bg-success" value="Done">Done</option>
                    </select>
                    <button className="btn btn-danger mt-3">Add Task</button>
                </form>
            </div>

        </>
    )
}

export default AddTask