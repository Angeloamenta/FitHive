import { Link } from "react-router-dom"
import Kettlebell from "../components/Kettlebell"
import {Github} from "lucide-react"



const Homepage = ()=> {
    return (
        <>
        <div className="hero">
            <Kettlebell></Kettlebell>
            {/* <div className="flex justify-center pb-4">
                <Link to="/login"><button className="btn btn-orange">Login</button></Link>
            </div> */}
            <div className="flex justify-center items-center pb-5">
                    <button className="text-xl btn-white">Log-in</button>
                </div>
            <div className=" flex justify-center items-center">
                <p className="flex justify-center items-center">Created by Angelo Amenta <a className="p-2 my-3" href="https://github.com/Angeloamenta"><Github color="white" /></a></p>
            </div>
        </div>
        </>
    )
}

export default Homepage;