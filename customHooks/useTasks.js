import { useState, useEffect } from "react";
const { VITE_APP_API_URL } = import.meta.env


function useTasks() {

    //mostra elenco tasks

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`${VITE_APP_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err))
    }, []);

    // Aggiungere unan task con POST 

    const addTask = async (taskData) => {
        const res = await fetch(`${VITE_APP_API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        });
        const data = await res.json();  //data è il risultato della fetch e restituisce un'oggetto con proprietà {success , message, task}

        if (data.success) {    //se la proprietà success della risposta "data" è true 
            setTasks(prev => [...prev, data.task]); //allora setta tasks facendo una copia delle task già esistenti e aggiungi quella NUOVA 
        } else {  //altrimenti
            throw new Error(data.message);  // creami l'errore prendendo il message dalla risposta del fetch
        }
    }

    //Eliminare una task con DELETE

    const removeTask = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`, {
            method: "DELETE"                                                                //quando hai risposta da fetch, usa metodo DELETE
        })

        const data = await res.json()    //quando hai risposta trasforma la response in json()

        if (data.success) {
            setTasks(prev => prev.filter(task => task.id !== id))   //filtro     le task creando un nuovo array che contiene TUTTE le task tranne quella con l'id selezionato 
            alert("Task eliminata con successo")
        } else {
            throw new Error(data.message)

        }

    };

    // Modificare una task con PUT 

    const updateTask = async (updateTask) => {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks/${updateTask.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateTask)
            })

        const data = await res.json()


        if (data.success) {

            setTasks(prev =>
                prev.map(task =>
                    task.id === data.task.id
                        ? data.task
                        : task
                )
            );

        } else {
            throw new Error(data.message);
        }
    }
    return { tasks, addTask, removeTask, updateTask }
};

export default useTasks