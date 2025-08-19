import { useEffect, useState, } from "react"
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";
import { Link } from 'react-router-dom';


import axios from "axios";




const CustomerCard = () => {

    const URL = import.meta.env.VITE_BASE_URL


    const params = useParams()
    const [customer, setCustomer] = useState([])
    const navigate = useNavigate();
    const [workoutPlans, setWorkoutPlans] = useState([])

    useEffect(() => {
        console.log(params.id);
        axios.get(`${URL}/customers/${params.id}`)
            .then(function (res) {
                console.log(res.data);
                setCustomer(res.data)
                console.log(res.data.workoutPlans);
                setWorkoutPlans(res.data.workoutPlans)

            })
            .catch(function (error) {
                console.log(error);

            })
    }, [params.id])


    const deleteCustomer = () => {

        axios.delete(`http://localhost:3000/customers/${params.id}`)
            .then(function (res) {
                console.log(res);
                navigate(-1);


            })
            .catch(function (error) {
                console.log(error);

            })
    }

    const goBack = () => {
        navigate(-1);
    }



    return (
        <>
            <div>
                <h1 className="text-3xl mb-4">Customer Card</h1>
            </div>

            <div>
                <p>{customer.firstName}</p>
                <p>{customer.lasttName}</p>
            </div>
            <div className="workoutPlans mt-5 mb-5">
                {workoutPlans.map((workout) => {
                    return (
                        <Link to={`/utente/${params.id}/${workout.name}`} className=" block bg-slate-600 w-50 p-10 rounded-2xl shadow-2xl"
                          state={{ days: workout.days }}

                        >
                            {workout.name}
                        </Link>
                    )
                })}
            </div>
            <div>
                <button className="bg-orange-700 rounded-3xl p-1.5 mt-2" onClick={deleteCustomer}>Delete</button>
                <button className="bg-blue-400 rounded-3xl p-1.5 mt-2 ml-1.5" onClick={goBack}>Back</button>

            </div>
        </>
    )
}

export default CustomerCard