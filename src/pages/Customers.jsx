import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import axios from "axios";

import { useForm } from "react-hook-form"

const Customers = () => {
    

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },

    } = useForm()

    const fetchCustomers = () => {
        axios.get('http://localhost:3000/customers/')
            .then(function (res) {
                console.log(res);
                setCustomers(res.data)

            })
            .catch(function (error) {
                console.log(error);

            })
    }

    const onSubmit = (data) => {
        console.log(data)

        axios.post('http://localhost:3000/customers/add', {
            firstName: data.nome,
            lastName: data.cognome
        })
            .then(function (response) {
                console.log(response);
                fetchCustomers()
                reset()


            })
            .catch(function (error) {
                console.log(error);

            })
    };

    const [deleteId, setDeleteId] = useState('')

    const deleCustomId = (id) => {
        console.log(id);
        axios.delete(`http://localhost:3000/customers/${id}`)
            .then(function (res) {
                console.log(res);
                axios.get('http://localhost:3000/customers/')
                    .then(function (res) {
                        console.log(res);
                        setCustomers(res.data)

                    })
                    .catch(function (error) {
                        console.log(error);

                    })


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

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="nome"
                    {...register('nome')}
                />

                <input
                    type="text"
                    placeholder="cognome"
                    {...register('cognome')}
                />

                <input
                    className="bg-purple-500 block rounded-2xl p-1 mt-2 mb-2"
                    type="submit" />
            </form>

            <div className="flex gap-2 flex-row">
                {customers &&
                    customers.map((customer, index) => {
                        return (
                            <Link to={`/utente/${customer._id}`} className="  h-50
                             bg-slate-800 w-50 
                             rounded-2xl
                             p-4 text-center
                             flex flex-col justify-between
                             "  key={index}>
                                <div>
                                    <p>{customer.firstName}</p>
                                    <p>{customer.lastName}</p>
                                </div>

                            </Link>
                        )
                    })

                }
            </div>

        </>
    )

}

export default Customers
