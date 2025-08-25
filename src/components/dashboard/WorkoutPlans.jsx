import { useCustomer } from "../../context/CustomerContext";
import { useCrud } from "../../context/CrudContext";
import { Dumbbell } from "lucide-react";

const WorkoutPlans = () => {
  const { globalCustomers } = useCustomer();
  const { selectedCustomerId } = useCrud();

  const selectedCustomer = globalCustomers.find(c => c._id === selectedCustomerId);
  const workoutPlans = selectedCustomer?.workoutPlans || [];

  if (!selectedCustomer) {
    return (
      <div className="text-gray-700 text-center mt-6">Caricamento schede...</div>
    );
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Schede di {selectedCustomer.firstName}
      </h2>

      {workoutPlans.length === 0 ? (
        <p className="text-gray-500 text-center">Nessuna scheda disponibile</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workoutPlans.map((wp) => (
            <div
              key={wp._id}
              className="bg-white border border-gray-300 p-5 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer flex items-center justify-between"
            >
              <span className="text-gray-800 font-semibold uppercase">
                {wp.name}
              </span>
              <Dumbbell className="w-6 h-6 text-gray-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;

