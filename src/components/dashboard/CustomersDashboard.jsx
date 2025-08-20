import Dashboard from "../../pages/Dashboard"
import api from '../../interceptor/axiosClient'
import DeleteModal from "../DeleteModal"
import { useEffect, useState } from "react"


const CustomersDashboard = () => {

    const [customers, setCustomers] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [deletedCustomer, setDeleteCustomer] = useState()

    const fetchCustomers = ()=> {
         api.get('/customers')
            .then((res) => {
                setCustomers(res.data)
                console.log(customers);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
       fetchCustomers()
    }, [])

    const prepareDelete = (customer)=> {
        console.log(customer);
        setDeleteCustomer(customer)
        
    }

    const deleteCustomer = (id)=> {
        api.delete(`/customers/${id}`)
        .then((res)=> {console.log(res);
        fetchCustomers()
        })
        .catch((err) => {console.log(err);
        })


        
    }

        return (
  <>
    <div className="mb-6 mt-6">
      <h1 className="uppercase text-center text-4xl font-bold text-gray-900">Iscritti</h1>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Nome</th>
            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Cognome</th>
            <th className="px-4 py-2 text-left text-gray-800 font-semibold">ID</th>
            <th className="px-4 py-2 text-left text-gray-800 font-semibold">N. schede</th>
            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Elimina</th>

          </tr>
        </thead>

        <tbody>
          {customers.map((customer, idx) => (
            <tr
              key={customer._id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"} // righe alternate
            >
              <td className="px-4 py-2 text-gray-900">{customer.firstName}</td>
              <td className="px-4 py-2 text-gray-900">{customer.lastName}</td>
              <td className="px-4 py-2 text-gray-700">{customer._id}</td>
              <td className="px-4 py-2 text-gray-900">{customer.workoutPlans ? customer.workoutPlans.length : 0}</td>
              <td className="px-4 py-2 text-gray-700">
                <button
                onClick={() => {prepareDelete(customer); setModalActive(true);}}
                 className="button bg-red-600 text-white rounded-md p-1">Elimina</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
          {modalActive && <DeleteModal setModal={setModalActive} customer={deletedCustomer} deleteCustomer={deleteCustomer} />}
    </div>
  </>
);

    
}

export default CustomersDashboard