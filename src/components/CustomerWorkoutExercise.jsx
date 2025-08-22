import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

const CustomerWorkoutExercises = () => {
  const location = useLocation();
  const params = useParams();
  const RESET_HOURS = 8;
  const RESET_MS = RESET_HOURS * 60 * 60 * 1000;

  const [exercises, setExercises] = useState([]);
  const [checked, setChecked] = useState({});
  const [timers, setTimers] = useState({});
  const [loading, setLoading] = useState(true);
  const intervalRefs = useRef({});

  useEffect(() => {
    setLoading(true);

    let loadedExercises = [];

    // usa state se presente
    if (location.state?.exercises) {
      loadedExercises = location.state.exercises;
    } else {
      // fallback su localStorage
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

      loadedExercises =
        selectedPlan?.days?.flatMap((day) => day.exercises) || [];
    }

    setExercises(loadedExercises);

    // inizializza check
    const savedChecks = JSON.parse(localStorage.getItem("checkedExercises") || "{}");
    const now = Date.now();
    const cleanedChecks = {};
    Object.keys(savedChecks).forEach((key) => {
      if (now - savedChecks[key].timestamp < RESET_MS) cleanedChecks[key] = savedChecks[key];
    });
    setChecked(cleanedChecks);

    // inizializza timers
    const savedTimers = JSON.parse(localStorage.getItem("exerciseTimers") || "{}");
    setTimers(savedTimers || {});

    setLoading(false);
  }, [location.state, params]);

  useEffect(() => {
    localStorage.setItem("checkedExercises", JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem("exerciseTimers", JSON.stringify(timers));
  }, [timers]);

  const toggleCheck = (name) => {
    setChecked((prev) => ({
      ...prev,
      [name]: { value: !prev[name]?.value, timestamp: Date.now() },
    }));
  };

  const toggleTimer = (name) => {
    setTimers((prev) => {
      const current = prev[name] || { running: false, time: 0 };
      if (current.running) {
        clearInterval(intervalRefs.current[name]);
        return { ...prev, [name]: { ...current, running: false } };
      } else {
        const interval = setInterval(() => {
          setTimers((prevTimers) => ({
            ...prevTimers,
            [name]: { ...prevTimers[name], time: prevTimers[name].time + 1 },
          }));
        }, 1000);
        intervalRefs.current[name] = interval;
        return { ...prev, [name]: { ...current, running: true } };
      }
    });
  };

  const resetTimer = (name) => {
    clearInterval(intervalRefs.current[name]);
    setTimers((prev) => ({
      ...prev,
      [name]: { running: false, time: 0 },
    }));
  };

  const resetAllChecks = () => setChecked({});

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!exercises.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4 p-6">
        <p>Nessun esercizio trovato.</p>
        <button
          onClick={resetAllChecks}
          className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-semibold"
        >
          Reset Check
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-repeat p-6">
      <h1 className="text-3xl mb-6 text-center text-white font-extrabold tracking-wide">
        Esercizi
      </h1>

      <ul className="flex flex-col gap-4">
        {exercises.map((exercise) => {
          const isChecked = checked[exercise.name]?.value || false;
          const timer = timers[exercise.name] || { running: false, time: 0 };

          return (
            <li
              key={exercise._id}
              className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-3xl shadow-lg shadow-purple-600/40 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className={`text-white font-semibold ${isChecked ? "line-through text-gray-400" : ""}`}>
                  {exercise.name}
                </h3>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCheck(exercise.name)}
                  className="w-6 h-6 accent-purple-400"
                />
              </div>

              <div className="text-gray-300 text-sm">{exercise.repset}</div>
              {exercise.notes && <div className="text-gray-400 text-sm italic">{exercise.notes}</div>}

              <div className="flex items-center gap-2 mt-2">
                <span className="text-purple-300 font-mono">{formatTime(timer.time)}</span>
                <button
                  onClick={() => toggleTimer(exercise.name)}
                  className="px-3 py-1 rounded-xl bg-purple-700 hover:bg-purple-500 text-white"
                >
                  {timer.running ? "Stop" : "Start"}
                </button>
                <button
                  onClick={() => resetTimer(exercise.name)}
                  className="px-3 py-1 rounded-xl bg-gray-600 hover:bg-gray-500 text-white"
                >
                  Reset
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 text-center">
        <button
          onClick={resetAllChecks}
          className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-semibold"
        >
          Reset Check
        </button>
      </div>
    </div>
  );
};

export default CustomerWorkoutExercises;



// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const CustomerWorkoutExercises = () => {

//         const location = useLocation();
//     const exercises = location.state?.exercises || [];
    
    
//         useEffect(() => {
//             console.log(location);
            
//             console.log(exercises);
            
//         })
//     return(
//         <>
//         <h1>Esercizi</h1>

//         <div>
//             <ul className="flex gap-2">
//                 {exercises.map((exercise) => {
//                     return(
//                         <li className="bg-slate-600 w-50 p-10 rounded-2xl shadow-2xl">
//                             <h3>{exercise.name}</h3>
//                             <div>
//                                 {exercise.repset}
//                             </div>
//                             <div>
//                                 {exercise.notes}
//                             </div>
//                         </li>
//                     )
//                 })}
//             </ul>
//         </div>
//         </>
//     )
// }

// export default CustomerWorkoutExercises