import { NavLink } from "react-router-dom"
import logo from '../public/favicon.svg'

function Navbar() {
    return (

        <>
            <nav className="navbar fixed-top">
                <div className="container">
                    <div>
                        <a className="navbar-brand" href={"/"}>
                            <img src={logo} alt="logo" style={{ width: 150, height: 70 }} />
                        </a>
                    </div>
                    <div className="d-flex gap-3">

                        <NavLink className="btn btn-danger" to="/">Home</NavLink>
                        <NavLink className="btn btn-danger" to="/tasklist">Lista</NavLink>
                        <NavLink className="btn btn-danger" to="/addtask">Aggiungi</NavLink>

                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar 