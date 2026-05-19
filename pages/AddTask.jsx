import { useMemo, useRef, useState } from "react"

function AddTask() {

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\\\",.<>?/`~";

    //per il title
    const [title, setTitle] = useState("")
    //per la textarea
    const RefDescription = useRef("")

    //per select
    const RefSelect = useRef("To do")

    const isTitleValid = useMemo(() => {
        const containSymbols = title.split("").some(char => {
            return symbols.includes(char.toLowerCase())
        })

        return !containSymbols && title.trim() !== "";
    }, [title])


    const submit = (e) => {
        e.preventDefault();
        const description = RefDescription.current.value
        const select = RefSelect.current.value

        //validazioni:

        if (!isTitleValid) {
            alert("Il titolo non è corretto")
            console.error("Titolo errato")
            return
        }
        alert("Hai aggiunto la Task con successo")
        console.log({
            title,
            description,
            select
        })
    }

    return (
        <>
            <div className="mt-3">
                <form onSubmit={submit} id="taskForm">
                    <label>Title</label>
                    <input className="form-control" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <label >Description</label>
                    <textarea className="form-control" name="description" rows="2" placeholder="Add a description" ref={RefDescription}></textarea>
                    <label>Status</label>
                    <select className="form-select" ref={RefSelect}>
                        <option defaultValue={""}></option>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                    <button className="btn btn-danger mt-3">Add Task</button>
                </form>
            </div>

        </>
    )
}

export default AddTask