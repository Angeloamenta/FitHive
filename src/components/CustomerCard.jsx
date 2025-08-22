import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Dumbbell } from 'lucide-react';


const CustomerCard = () => {
    const URL = import.meta.env.VITE_BASE_URL

    const params = useParams()
    const [customer, setCustomer] = useState([])
    const navigate = useNavigate();
    const [workoutPlans, setWorkoutPlans] = useState([])

    // 👇 nuovo stato per gestire il caricamento
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${URL}/customers/${params.id}`)
            .then((res) => {
                setCustomer(res.data)
                setWorkoutPlans(res.data.workoutPlans)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                // 👇 quando la chiamata finisce (successo o errore) tolgo il loading
                setLoading(false)
            })
    }, [params.id])



    return (
        <>
            <div>
                <h1 className="text-3xl mb-4 text-center">Schede utente</h1>
            </div>

            <div className="text-center text-2xl">
                <p>{customer.firstName} {customer.lastName}</p>
            </div>

            <div className="workoutPlans mt-5 mb-5 flex gap-5">
                {loading ? (
                    <p>Caricamento...</p>
                ) : !workoutPlans.length ? (
                    <p>Nessuna scheda</p>
                ) : (
                    workoutPlans.map((workout) => (
                        <Link
                            key={workout._id} // 👈 aggiunta la key per evitare warning React
                            to={`/utente/${params.id}/${workout.name}`}
                            className="block bg-slate-600 w-50 p-10 rounded-2xl text-md justify-center uppercase shadow-md shadow-white flex items-center"
                            state={{ days: workout.days }}
                        >
                            {workout.name}
                            <Dumbbell />
                        </Link>
                        
                    ))
                )}
                
            </div>
              
        </>
    )
}

export default CustomerCard
