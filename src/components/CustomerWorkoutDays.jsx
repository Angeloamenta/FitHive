import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom";



const CustomerWorkoutDays = () => {

    const location = useLocation();
const days = location.state?.days || [];


    useEffect(() => {
        console.log(location);
        
        console.log(days[0].exercises);
        
    })
    return (
        <>
        <h1>Giorni</h1>

        <div>
                {days.map((day) => {
                    return(
                        <div>
                        <Link to={`${location.pathname}/giorno/${day.name}`}
                        state={{exercises: day.exercises}}
                        >
                            {day.name}
                        </Link>
                        </div>
                    )
                })}

        </div>
        </>
    )
}

export default CustomerWorkoutDays