import { Link } from "react-router-dom"
import logo from '../assets/img/logo.png'
import { SquareMenu } from "lucide-react"
import { Dumbbell } from "lucide-react"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {

    const {token} = useAuth()

    return (
        // <nav className="navbar ">
        //     <div className="container-fluid ">
        //         <Link className="navbar-brand" to="/"><img className="img-fluid logo" src={logo} alt="" /></Link>
        //         <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">

        //             <SquareMenu color="#ee6115" size={36} />
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarText">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li className="nav-item">
        //                     <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/schede">Schede</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/login">Login</Link>
        //                 </li>
        //                 <li>
        //                     <Link className="nav-link" to="/utenti">Utenti</Link>
        //                 </li>
        //             </ul>
        //             <span className="navbar-text">
        //                 User
        //             </span>
        //         </div>
        //     </div>
        // </nav>
        <nav className="w-full  flex justify-center h-16 mb-10 ">
            <div className=" flex w-11/12 justify-between ">
                <div className="flex items-center">
                    <h1 className="text-2xl flex ">FitHive</h1>
                </div>
                <div>
                    <ul className="hidden md:flex gap-10 h-full items-center">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/schede">Schede</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/iscritti">Iscritti</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-3 items-center">
                    <Link to="/login" className="text-2xl btn-white">Log-in</Link>
                    {token && (
                        <Link to="/dashboard" className="text-2xl btn-white">Dashboard</Link> 
                    )}

                </div>
            </div>
        </nav>
    )
}

export default Navbar