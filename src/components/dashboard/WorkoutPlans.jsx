import { useCustomer } from "../../context/CustomerContext";
import { useCrud } from "../../context/CrudContext";
import { Trash } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";

const WorkoutPlans = () => {
    const { globalCustomers, fetchCustomer } = useCustomer();
    const { selectedCustomerId, deleteWorkout, addExercise } = useCrud(); // aggiungiamo addExercise
    const [openPlanId, setOpenPlanId] = useState(null);
    const [exerciseFormDayId, setExerciseFormDayId] = useState(null);
    const [newExerciseName, setNewExerciseName] = useState("");

    const selectedCustomer = globalCustomers.find(c => c._id === selectedCustomerId);
    const workoutPlans = selectedCustomer?.workoutPlans || [];

    if (!selectedCustomer) {
        return <div className="text-gray-700 text-center mt-6">Caricamento schede...</div>;
    }

    const handleDeletePlan = (id) => {
        deleteWorkout(id);
        fetchCustomer();
    };

    const handleAddExercise = async (dayId) => {
        if (!newExerciseName) return;
        await addExercise(openPlanId, dayId, { name: newExerciseName });
        setNewExerciseName("");
        setExerciseFormDayId(null);
        fetchCustomer();
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
                                <span className="text-gray-800 font-semibold uppercase">{wp.name}</span>
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
                    {workoutPlans.find(wp => wp._id === openPlanId).days.map(day => (
                        <div key={day._id} className="mb-4 border-b border-gray-300 pb-2">
                            <h3 className="text-lg font-semibold flex justify-between items-center">
                                {day.name}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            setExerciseFormDayId(exerciseFormDayId === day._id ? null : day._id)
                                        }
                                        className="text-purple-950 hover:underline"
                                    >
                                        + Aggiungi esercizio
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
                                {day.exercises.map((exercise, idx) => (
                                    <li key={idx} className="flex justify-between items-center">
                                        <span>{exercise.name}</span>
                                        <div className="flex gap-2">
                                            <button className="text-purple-950 hover:underline">Modifica</button>
                                            <button className="text-red-500 hover:underline">Elimina</button>
                                        </div>
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
