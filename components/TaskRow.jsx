//import { useTask } from "../src/context/TaskContext"
import { memo } from "react"
import { Link } from "react-router-dom";



function TaskRow({ id, title, status, createdAt }) { //passo task come prop per fare il map nel componente padre

    //const tasks = useTask();
    return (
        <>
            <tr>
                <td ><Link className="text-decoration-none text-body-emphasis" to={`/task/${id}`}>{title}</Link></td>
                <td className={
                    status === "To do" ? "bg-danger" :   //uso ternario concatenato per gestire gli sfondi
                        status === "Doing" ? "bg-warning" :
                            status === "Done" ? "bg-success" : ""}>
                    {status}
                </td>
                <td> {createdAt} </td>

            </tr>

        </>
    )
}

export default memo(TaskRow);  //uso memo, in modo che il componente non venga ri-renderizzato se le props non cambiano. 