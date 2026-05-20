import { NavLink } from "react-router-dom"
import logo from '../public/logo.png'

function Navbar() {
    return (

        <>
            <nav className="navbar fixed-top">
                <div className="container">
                    <div>
                        <a className="navbar-brand" href={"/"}>
                            <img src={logo} alt="logo" style={{ width: 80, height: 80 }} />
                        </a>
                    </div>
                    <div className="d-flex gap-3">

                        <NavLink className="btn btn-secondary" to="/">Home</NavLink>
                        <NavLink className="btn btn-secondary" to="/tasklist">Lista</NavLink>
                        <NavLink className="btn btn-secondary" to="/addtask">Aggiungi</NavLink>

                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar 