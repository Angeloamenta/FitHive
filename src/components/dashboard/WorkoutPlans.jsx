import { useCustomer } from "../../context/CustomerContext";
import { useCrud } from "../../context/CrudContext";
import { Trash, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const WorkoutPlans = () => {
  const { globalCustomers, fetchCustomers } = useCustomer();
  const {
    selectedCustomerId,
    deleteWorkout,
    addExercise,
    deleteDay,
    editDay,
    deleteExercise,
    editExercise,
    editPlan,
  } = useCrud();

  const [openPlanId, setOpenPlanId] = useState(null);
  const [exerciseFormDayId, setExerciseFormDayId] = useState(null);
  const [newExerciseName, setNewExerciseName] = useState("");

  const [editPlanId, setEditPlanId] = useState(null);
  const [planNewName, setPlanNewName] = useState("");

  const [editDayId, setEditDayId] = useState(null);
  const [dayNewName, setDayNewName] = useState("");

  const [editExerciseId, setEditExerciseId] = useState(null);
  const [exerciseEditValues, setExerciseEditValues] = useState({
    name: "",
    repset: "",
    rec: "",
    notes: "",
    position: 0,
  });

  const selectedCustomer = globalCustomers.find(
    (c) => c._id === selectedCustomerId
  );
  const workoutPlans = selectedCustomer?.workoutPlans || [];

  if (!selectedCustomer) {
    return (
      <div className="text-gray-700 text-center mt-6">Caricamento schede...</div>
    );
  }

  const handleDeletePlan = async (id) => {
    await deleteWorkout(id);
    fetchCustomers();
  };

  const handleAddExercise = async (dayId) => {
    if (!newExerciseName) return;
    await addExercise(openPlanId, dayId, { name: newExerciseName });
    setNewExerciseName("");
    setExerciseFormDayId(null);
    fetchCustomers();
  };

  const handleEditPlan = async (planId) => {
    await editPlan(planId, { name: planNewName });
    setEditPlanId(null);
    setPlanNewName("");
    fetchCustomers();
  };

  const handleEditDay = async (planId, dayId) => {
    await editDay(planId, dayId, { name: dayNewName });
    setEditDayId(null);
    setDayNewName("");
    fetchCustomers();
  };

  const handleEditExercise = async (planId, dayId, exerciseId) => {
    await editExercise(planId, dayId, exerciseId, exerciseEditValues);
    setEditExerciseId(null);
    setExerciseEditValues({ name: "", repset: "", rec: "", notes: "", position: 0 });
    fetchCustomers();
  };

  return (
    <>
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
                className="bg-white border border-gray-300 p-5 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105 flex items-center justify-between"
              >
                {editPlanId === wp._id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      className="border rounded p-1 flex-1"
                      value={planNewName}
                      onChange={(e) => setPlanNewName(e.target.value)}
                    />
                    <button
                      onClick={() => handleEditPlan(wp._id)}
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      ✔
                    </button>
                  </div>
                ) : (
                  <span
                    className="text-gray-800 font-semibold uppercase cursor-pointer"
                    onClick={() => {
                      setEditPlanId(wp._id);
                      setPlanNewName(wp.name);
                    }}
                  >
                    {wp.name}
                  </span>
                )}
                {wp._id === openPlanId ? (
                  <EyeOff
                    onClick={() => setOpenPlanId(null)}
                    className="w-6 h-6"
                  />
                ) : (
                  <Eye
                    onClick={() => setOpenPlanId(wp._id)}
                    className="w-6 h-6"
                  />
                )}
                <Trash
                  onClick={() => handleDeletePlan(wp._id)}
                  className="w-6 h-6 text-red-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {openPlanId && (
        <div className="mt-4 max-w-4xl mx-auto p-4 bg-gray-100 rounded-xl">
          {workoutPlans
            .find((wp) => wp._id === openPlanId)
            .days.map((day) => (
              <div key={day._id} className="mb-4 border-b border-gray-300 pb-2">
                <h3 className="text-lg font-semibold flex justify-between items-center">
                  {editDayId === day._id ? (
                    <div className="flex gap-2">
                      <input
                        className="border rounded p-1"
                        value={dayNewName}
                        onChange={(e) => setDayNewName(e.target.value)}
                      />
                      <button
                        onClick={() => handleEditDay(openPlanId, day._id)}
                        className="bg-green-500 text-white px-2 rounded"
                      >
                        ✔
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setEditDayId(day._id);
                        setDayNewName(day.name);
                      }}
                      className="cursor-pointer"
                    >
                      {day.name}
                    </span>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setExerciseFormDayId(
                          exerciseFormDayId === day._id ? null : day._id
                        )
                      }
                      className="text-purple-950 hover:underline"
                    >
                      + Aggiungi esercizio
                    </button>
                    <button
                      onClick={() => deleteDay(openPlanId, day._id)}
                      className="text-red-500 hover:underline"
                    >
                      Elimina giorno
                    </button>
                  </div>
                </h3>

                {exerciseFormDayId === day._id && (
                  <div className="mt-2 flex gap-2 items-center">
                    <input
                      type="text"
                      className="border rounded p-1 flex-1"
                      placeholder="Nome esercizio"
                      value={newExerciseName}
                      onChange={(e) => setNewExerciseName(e.target.value)}
                    />
                    <button
                      onClick={() => handleAddExercise(day._id)}
                      className="bg-purple-950 text-white px-3 py-1 rounded"
                    >
                      Aggiungi
                    </button>
                  </div>
                )}

                <ul className="ml-4 mt-2 list-disc list-inside">
                  {day.exercises.map((exercise, index) => (
                    <li
                      key={exercise._id}
                      className="flex flex-col gap-1 border-b border-gray-200 py-1"
                    >
                      {editExerciseId === exercise._id ? (
                        <div className="flex flex-col gap-2 w-full">
                          <input
                            className="border rounded p-1"
                            placeholder="Nome"
                            value={exerciseEditValues.name}
                            onChange={(e) =>
                              setExerciseEditValues({
                                ...exerciseEditValues,
                                name: e.target.value,
                              })
                            }
                          />
                          <input
                            className="border rounded p-1"
                            placeholder="Serie/Ripetizioni"
                            value={exerciseEditValues.repset}
                            onChange={(e) =>
                              setExerciseEditValues({
                                ...exerciseEditValues,
                                repset: e.target.value,
                              })
                            }
                          />
                          <input
                            className="border rounded p-1"
                            placeholder="Recupero"
                            value={exerciseEditValues.rec}
                            onChange={(e) =>
                              setExerciseEditValues({
                                ...exerciseEditValues,
                                rec: e.target.value,
                              })
                            }
                          />
                          <input
                            className="border rounded p-1"
                            placeholder="Note"
                            value={exerciseEditValues.notes}
                            onChange={(e) =>
                              setExerciseEditValues({
                                ...exerciseEditValues,
                                notes: e.target.value,
                              })
                            }
                          />

                          {/* Select posizione */}
                          <select
                            className="border rounded p-1"
                            value={exerciseEditValues.position}
                            onChange={(e) =>
                              setExerciseEditValues({
                                ...exerciseEditValues,
                                position: parseInt(e.target.value),
                              })
                            }
                          >
                            {day.exercises.map((_, i) => (
                              <option key={i} value={i}>
                                {i + 1}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() =>
                              handleEditExercise(
                                openPlanId,
                                day._id,
                                exercise._id
                              )
                            }
                            className="bg-green-500 text-white px-2 rounded"
                          >
                            ✔ Salva
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold">{exercise.name}</span>
                            <div className="text-sm text-gray-600">
                              {exercise.repset && (
                                <span>Serie/Ripetizioni: {exercise.repset} </span>
                              )}
                              {exercise.rec && <span> | Recupero: {exercise.rec} </span>}
                              {exercise.notes && <span> | Note: {exercise.notes}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditExerciseId(exercise._id);
                                setExerciseEditValues({
                                  name: exercise.name || "",
                                  repset: exercise.repset || "",
                                  rec: exercise.rec || "",
                                  notes: exercise.notes || "",
                                  position: index,
                                });
                              }}
                              className="text-purple-950 hover:underline"
                            >
                              Modifica
                            </button>
                            <button
                              onClick={() =>
                                deleteExercise(openPlanId, day._id, exercise._id)
                              }
                              className="text-red-500 hover:underline"
                            >
                              Elimina
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default WorkoutPlans;

