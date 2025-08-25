import Dashboard from "../../pages/Dashboard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import AddCustomerComponent from "../CrudComponent/AddCustomerComponent";
import DeleteModal from "../DeleteModal";
import api from '../../interceptor/axiosClient';
import { useCrud } from "../../context/CrudContext";


const CustomersDashboard = () => {
    const { globalCustomers, fetchCustomers } = useCustomer();
    const [loading, setLoading] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [deletedCustomer, setDeleteCustomer] = useState(null);

    const {setCustomerId} = useCrud();

    useEffect(() => {
        setLoading(true);
        fetchCustomers();
        setLoading(false);
    }, []);

    const prepareDelete = (customer) => {
        setDeleteCustomer(customer);
        setModalActive(true);
    }

    const deleteCustomer = async (id) => {
        try {
            await api.delete(`/customers/${id}`);
            fetchCustomers(); // aggiorna automaticamente globalCustomers
        } catch (err) {
            console.log(err);
        }
    }

    const selectCustomerId =(id) => {
        setCustomerId(id)
        
    }

    return (
        <>
            <div className="mb-6 mt-6 text-center">
                <h1 className="uppercase text-4xl font-bold text-gray-900">Iscritti</h1>
            </div>

            <div className="py-5">
                <h2 className="text-xl font-semibold mb-2">Aggiungi</h2>
                <AddCustomerComponent />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Nome</th>
                            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Cognome</th>
                            <th className="px-4 py-2 text-left text-gray-800 font-semibold">ID</th>
                            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Schede</th>
                            <th className="px-4 py-2 text-left text-gray-800 font-semibold">Elimina</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    <div className="flex justify-center items-center">
                                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="ml-2 text-gray-600">Caricamento...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : globalCustomers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-600">
                                    Nessun cliente trovato
                                </td>
                            </tr>
                        ) : (
                            globalCustomers.map((customer, idx) => (
                                <tr key={customer._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-4 py-2 text-gray-900">{customer.firstName}</td>
                                    <td className="px-4 py-2 text-gray-900">{customer.lastName}</td>
                                    <td className="px-4 py-2 text-gray-700">{customer._id}</td>
                                    <td className="px-4 py-2 text-gray-900">
                                        {customer.workoutPlans ? customer.workoutPlans.length : 0}
                                        <Link
                                        onClick={() =>selectCustomerId(customer._id)}
                                            to={`/dashboard/customer/${customer._id}`}
                                            className="button bg-slate-800 ml-2 text-white rounded-md p-1"
                                        >
                                            Vedi Schede
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <button
                                            onClick={() => prepareDelete(customer)}
                                            className="button bg-red-600 text-white rounded-md p-1"
                                        >
                                            Elimina
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {modalActive && (
                    <DeleteModal
                        setModal={setModalActive}
                        customer={deletedCustomer}
                        deleteCustomer={deleteCustomer}
                    />
                )}
            </div>
        </>
    );
}

export default CustomersDashboard;
