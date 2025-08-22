import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const CustomerWorkoutDays = () => {
  const location = useLocation();
  const params = useParams();
  const [days, setDays] = useState([]);

  useEffect(() => {
    let loadedDays = [];

    if (location.state?.days) {
      loadedDays = location.state.days;
    } else {
      const storedCustomer = JSON.parse(localStorage.getItem("customerData") || "{}");
      const workoutPlans = storedCustomer.workoutPlans || [];

      let selectedPlan;

      if (params.workoutName) {
        selectedPlan = workoutPlans.find(
          (w) => w.name.toLowerCase() === params.workoutName.toLowerCase()
        );
      }

      if (!selectedPlan && workoutPlans.length > 0) {
        selectedPlan = workoutPlans[0];
      }

      loadedDays = selectedPlan?.days || [];
    }

    setDays(loadedDays);
  }, [location.state, params]);

  return (
    <div className="min-h-screen bg-black bg-[url('/honeycomb-pattern.svg')] bg-repeat p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-wider">
          Giorni Allenamento
        </h1>
      </div>

      {days.length === 0 ? (
        <p className="text-gray-400 text-xl text-center mt-12">Caricamento schede...</p>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {days.map((day) => (
            <Link
              key={day._id}
              to={`${location.pathname}/giorno/${day.name}`}
              state={{ exercises: day.exercises }}
              className="
                flex-1 min-w-[250px] max-w-[300px] 
                bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900
                p-6 rounded-3xl 
                text-white font-semibold uppercase tracking-wide 
                shadow-lg shadow-purple-600/40
                flex items-center justify-center 
                transform transition duration-300 hover:scale-105 hover:shadow-purple-400/80
                border border-purple-600/30
              "
            >
              {day.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerWorkoutDays;

