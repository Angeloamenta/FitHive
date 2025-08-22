import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Dumbbell } from 'lucide-react';

const CustomerCard = () => {
    const URL = import.meta.env.VITE_BASE_URL;
    const params = useParams();
    const [customer, setCustomer] = useState({});
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${URL}/customers/${params.id}`)
            .then((res) => {
                setCustomer(res.data);
                setWorkoutPlans(res.data.workoutPlans || []);
                localStorage.setItem('customerData', JSON.stringify(res.data));
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [params.id]);

    return (
        <div className="min-h-screen bg-repeat p-6">
            <h1 className="text-3xl mb-4 text-center text-white font-extrabold tracking-wide">
                Schede Utente
            </h1>
            <p className="text-center text-2xl text-gray-300 mb-6">
                {customer.firstName} {customer.lastName}
            </p>

            <div className="flex flex-wrap gap-6 justify-center px-2">
                {loading ? (
                    <p className="text-gray-400 text-xl">Caricamento...</p>
                ) : !workoutPlans.length ? (
                    <p className="text-gray-400 text-xl">Nessuna scheda disponibile</p>
                ) : (
                    workoutPlans.map((workout) => (
                        <Link
                            key={workout._id}
                            to={`/utente/${params.id}/${workout.name}`}
                            state={{ days: workout.days }}
                            className="
                                flex-1 min-w-[250px] max-w-[300px]
                                bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900
                                p-6 rounded-3xl
                                text-white font-semibold uppercase tracking-wide
                                shadow-lg shadow-purple-600/40
                                flex items-center justify-between gap-4
                                transform transition duration-300 hover:scale-105 hover:shadow-purple-400/80
                                border border-purple-600/30
                            "
                        >
                            <span>{workout.name}</span>
                            <Dumbbell className="w-6 h-6 text-purple-300" />
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default CustomerCard;
