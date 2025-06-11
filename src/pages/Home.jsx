import { Link } from "react-router-dom"
import Kettlebell from "../components/Kettlebell"
Link


const Home = () => {

    return (
        <div className="hero">
            <Kettlebell></Kettlebell>
            <div className="d-flex justify-content-center">
                <Link to="/login"><button className="btn btn-orange">Login</button></Link>
            </div>
        </div>
    )
}

export default Home