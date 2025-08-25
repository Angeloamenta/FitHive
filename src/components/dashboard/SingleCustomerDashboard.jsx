import { useEffect } from "react";
import { useCustomer } from "../../context/CustomerContext";
import { useCrud } from "../../context/CrudContext";
import WorkoutPlans from "./WorkoutPlans";


const SingleCustomerDashboard = () => {
  const { globalCustomers } = useCustomer();
  const { selectedCustomerId } = useCrud();

  const selectedCustomer = globalCustomers.find(c => c._id === selectedCustomerId);

  useEffect(() => {
    console.log("Utente selezionato:", selectedCustomer);
  }, [selectedCustomer]);

  if (!selectedCustomer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Caricamento utente...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          {selectedCustomer.firstName} {selectedCustomer.lastName}
        </h1>

        <div className="flex flex-col gap-4 text-gray-700 text-lg">
          <div>
            <span className="font-semibold">ID utente: </span>
            {selectedCustomer._id}
          </div>
          <div>
            <span className="font-semibold">Schede: </span>
            {selectedCustomer.workoutPlans.length}
          </div>
        </div>
      </div>
      <div>
        <WorkoutPlans/>
      </div>
    </div>
  );
};

export default SingleCustomerDashboard;
