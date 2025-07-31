
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CustomerWorkoutExercises = () => {

        const location = useLocation();
    const exercises = location.state?.exercises || [];
    
    
        useEffect(() => {
            console.log(location);
            
            console.log(exercises);
            
        })
    return(
        <>
        <h1>Esercizi</h1>

        <div>
            <ul className="flex gap-2">
                {exercises.map((exercise) => {
                    return(
                        <li className="bg-slate-600 w-50 p-10 rounded-2xl shadow-2xl">
                            <h3>{exercise.name}</h3>
                            <div>
                                {exercise.repset}
                            </div>
                            <div>
                                {exercise.notes}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default CustomerWorkoutExercises