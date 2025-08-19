import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import axios from "axios";



const Iscritti = () => {
    
const URL = import.meta.env.VITE_BASE_URL


    const fetchCustomers = () => {
        axios.get(`${URL}/customers/`)
            .then(function (res) {
                console.log(res);
                setCustomers(res.data)

            })
            .catch(function (error) {
                console.log(error);

            })
    }




    const [customers, setCustomers] = useState([])
    useEffect(() => {
        console.log("prova");
       fetchCustomers()

    }, [])

    return (
        <>
        <div className=" flex justify-center">
            <div className=" w-11/12 flex justify-center gap-2 gap-y-4 flex-wrap flex-row">
                {customers &&
                    customers.map((customer, index) => {
                        return (
                            <Link to={`/utente/${customer._id}`} className="
                            w-2/2 h-fit
                             "  key={index}>
                                <div className="card-white">
                                    <p className="text-2xl">{customer.firstName}</p>
                                    <p className="text-2xl">{customer.lastName}</p>
                                </div>

                            </Link>
                        )
                    })

                }
            </div>
        </div>

        </>
    )

}

export default Iscritti
