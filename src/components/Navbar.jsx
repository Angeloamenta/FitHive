import { Link } from "react-router-dom"
import logo from '../assets/img/logo.png'
import {SquareMenu} from "lucide-react"
import {Dumbbell} from "lucide-react"




const Navbar = () => {

    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/"><img className="img-fluid logo" src={logo} alt="" /></Link>
                <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <SquareMenu /> */}
                    {/* <Dumbbell color="#ee6115" /> */}
                    <SquareMenu color="#ee6115" size={36} />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/schede">Schede</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        User
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar