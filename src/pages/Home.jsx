import { Link } from "react-router-dom"
import Kettlebell from "../components/Kettlebell"
import {Github} from "lucide-react"



const Home = () => {

    return (
        <div className="hero">
            <Kettlebell></Kettlebell>
            <div className="d-flex justify-content-center">
                <Link to="/login"><button className="btn btn-orange">Login</button></Link>
            </div>
            <div className="mt-5 text-light text-center">
                <p>Created by Angelo Amenta <a className="p-2 my-3" href="https://github.com/Angeloamenta"><Github color="white" /></a></p>
            </div>
        </div>
    )
}

export default Home