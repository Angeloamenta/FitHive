import { useState } from "react";
import { useCustomer } from "../../context/CustomerContext";
import { useCrud } from "../../context/CrudContext";

const WorkoutCreator = () => {
  const { globalCustomers } = useCustomer();
  const {
    selectedCustomerId,
    setCustomerId,
    addWorkout,
    addDay,
    deleteDay,
    addExercise,
    editExercise,
    deleteExercise,
  } = useCrud();

  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [newDayName, setNewDayName] = useState("");
  
  // CAMBIO: Ora usiamo un oggetto che tiene traccia degli input per ogni giorno
  const [exerciseInputs, setExerciseInputs] = useState({});

  const [editExerciseId, setEditExerciseId] = useState(null);
  const [exerciseEditValues, setExerciseEditValues] = useState({
    name: "",
    repset: "",
    rec: "",
    notes: "",
  });

  // Funzione helper per ottenere l'input di un giorno specifico
  const getExerciseInput = (dayId) => {
    return exerciseInputs[dayId] || { name: "", repset: "", rec: "", notes: "" };
  };

  // Funzione helper per aggiornare l'input di un giorno specifico
  const updateExerciseInput = (dayId, field, value) => {
    setExerciseInputs(prev => ({
      ...prev,
      [dayId]: {
        ...getExerciseInput(dayId),
        [field]: value
      }
    }));
  };

  // Seleziona customer - ora chiediamo il nome del workout prima di crearlo
  const handleSelectCustomer = (e) => {
    const customerId = e.target.value;
    setCustomerId(customerId);
    if (!customerId) {
      setCurrentWorkout(null);
      setExerciseInputs({}); // Reset anche gli input degli esercizi
    }
  };

  // Crea il workout plan con nome
  const handleCreateWorkout = async () => {
    const workoutName = prompt("Inserisci il nome del piano di allenamento:", "Piano di Allenamento");
    if (!workoutName) return;

    try {
      const response = await addWorkout(selectedCustomerId, { name: workoutName });
      console.log("Response completa:", response);
      
      // Gestisce sia la vecchia che la nuova struttura del backend
      const workout = response.workoutPlan || response;
      console.log("Workout estratto:", workout);
      
      setCurrentWorkout(workout);
      setExerciseInputs({}); // Reset input esercizi
    } catch (err) {
      console.error("Errore creazione workout:", err);
      alert("Errore nella creazione del workout");
    }
  };

  const handleAddDay = async () => {
    if (!newDayName.trim() || !currentWorkout) return;
    
    try {
      const response = await addDay(currentWorkout._id, newDayName);
      const newDay = response.day || response; // Gestisce entrambe le strutture
      
      setCurrentWorkout({
        ...currentWorkout,
        days: [...(currentWorkout.days || []), newDay],
      });
      setNewDayName("");
    } catch (err) {
      console.error(err);
      alert("Errore nell'aggiunta del giorno");
    }
  };

  const handleDeleteDay = async (dayId) => {
    try {
      await deleteDay(currentWorkout._id, dayId);
      setCurrentWorkout({
        ...currentWorkout,
        days: currentWorkout.days.filter((d) => d._id !== dayId),
      });
      
      // CAMBIO: Rimuovi anche l'input per questo giorno
      setExerciseInputs(prev => {
        const newInputs = { ...prev };
        delete newInputs[dayId];
        return newInputs;
      });
    } catch (err) {
      console.error(err);
      alert("Errore nell'eliminazione del giorno");
    }
  };

  const handleAddExercise = async (dayId) => {
    const exerciseData = getExerciseInput(dayId);
    
    if (!exerciseData.name.trim() || !exerciseData.repset.trim()) {
      alert("Nome esercizio e serie/ripetizioni sono obbligatori");
      return;
    }

    try {
      const response = await addExercise(currentWorkout._id, dayId, exerciseData);
      const exercise = response.exercise || response; // Gestisce entrambe le strutture
      
      // Aggiorna lo stato locale
      setCurrentWorkout({
        ...currentWorkout,
        days: currentWorkout.days.map((d) =>
          d._id === dayId
            ? { ...d, exercises: [...(d.exercises || []), exercise] }
            : d
        ),
      });

      // CAMBIO: Reset solo l'input per questo giorno specifico
      setExerciseInputs(prev => ({
        ...prev,
        [dayId]: { name: "", repset: "", rec: "", notes: "" }
      }));
    } catch (err) {
      console.error(err);
      alert("Errore nell'aggiunta dell'esercizio");
    }
  };

  const handleDeleteExercise = async (dayId, exerciseId) => {
    try {
      await deleteExercise(currentWorkout._id, dayId, exerciseId);
      setCurrentWorkout({
        ...currentWorkout,
        days: currentWorkout.days.map((d) =>
          d._id === dayId
            ? { ...d, exercises: d.exercises.filter((e) => e._id !== exerciseId) }
            : d
        ),
      });
    } catch (err) {
      console.error(err);
      alert("Errore nell'eliminazione dell'esercizio");
    }
  };

  const handleEditExercise = async (dayId) => {
    if (!exerciseEditValues.name.trim() || !exerciseEditValues.repset.trim()) {
      alert("Nome esercizio e serie/ripetizioni sono obbligatori");
      return;
    }

    try {
      const updatedExercise = await editExercise(
        currentWorkout._id, 
        dayId, 
        editExerciseId, 
        exerciseEditValues
      );

      setCurrentWorkout({
        ...currentWorkout,
        days: currentWorkout.days.map((d) =>
          d._id === dayId
            ? {
                ...d,
                exercises: d.exercises.map((e) =>
                  e._id === editExerciseId ? { ...e, ...exerciseEditValues } : e
                ),
              }
            : d
        ),
      });

      setEditExerciseId(null);
      setExerciseEditValues({ name: "", repset: "", rec: "", notes: "" });
    } catch (err) {
      console.error(err);
      alert("Errore nella modifica dell'esercizio");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Crea Workout</h2>

      {/* Selezione Customer */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Seleziona Cliente</label>
        <select
          className="border p-2 rounded w-full"
          onChange={handleSelectCustomer}
          value={selectedCustomerId || ""}
        >
          <option value="">-- Seleziona un cliente --</option>
          {globalCustomers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Crea Workout Plan */}
      {selectedCustomerId && !currentWorkout && (
        <div className="text-center py-8">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
            onClick={handleCreateWorkout}
          >
            Crea Nuovo Piano di Allenamento
          </button>
        </div>
      )}

      {currentWorkout && (
        <div className="border rounded p-4 bg-gray-50">
          <h3 className="font-semibold text-lg mb-4">Workout Plan: {currentWorkout.name || "Nuovo Piano"}</h3>
          
          {/* Aggiungi Giorno */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Aggiungi Giorno</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Es. Lunedì - Petto e Tricipiti"
                className="border p-2 flex-1 rounded"
                value={newDayName}
                onChange={(e) => setNewDayName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDay()}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddDay}
                disabled={!newDayName.trim()}
              >
                Aggiungi Giorno
              </button>
            </div>
          </div>

          {/* Lista Giorni */}
          <div className="space-y-4">
            {currentWorkout.days?.map((day) => {
              const exerciseInput = getExerciseInput(day._id);
              
              return (
                <div key={day._id} className="border rounded p-4 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-lg">{day.name}</h4>
                    <button
                      className="text-red-500 hover:text-red-700 px-2 py-1 border border-red-500 rounded"
                      onClick={() => handleDeleteDay(day._id)}
                    >
                      Elimina Giorno
                    </button>
                  </div>

                  {/* Form Aggiungi Esercizio - CAMBIO: ora usa exerciseInput specifico per questo giorno */}
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <h5 className="font-medium mb-2">Aggiungi Esercizio</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Nome Esercizio *"
                        className="border p-2 rounded"
                        value={exerciseInput.name}
                        onChange={(e) => updateExerciseInput(day._id, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Serie x Ripetizioni *"
                        className="border p-2 rounded"
                        value={exerciseInput.repset}
                        onChange={(e) => updateExerciseInput(day._id, 'repset', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Recupero (es. 60s)"
                        className="border p-2 rounded"
                        value={exerciseInput.rec}
                        onChange={(e) => updateExerciseInput(day._id, 'rec', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Note (opzionale)"
                        className="border p-2 rounded"
                        value={exerciseInput.notes}
                        onChange={(e) => updateExerciseInput(day._id, 'notes', e.target.value)}
                      />
                    </div>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                      onClick={() => handleAddExercise(day._id)}
                      disabled={!exerciseInput.name.trim() || !exerciseInput.repset.trim()}
                    >
                      Aggiungi Esercizio
                    </button>
                  </div>

                  {/* Lista Esercizi */}
                  {day.exercises?.length > 0 ? (
                    <div>
                      <h5 className="font-medium mb-2">Esercizi ({day.exercises.length})</h5>
                      <div className="space-y-2">
                        {day.exercises.map((exercise, index) => (
                          <div key={exercise._id} className="border rounded p-3 bg-gray-50">
                            {editExerciseId === exercise._id ? (
                              <div className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={exerciseEditValues.name}
                                    onChange={(e) =>
                                      setExerciseEditValues({ ...exerciseEditValues, name: e.target.value })
                                    }
                                    className="border p-2 rounded"
                                    placeholder="Nome esercizio"
                                  />
                                  <input
                                    type="text"
                                    value={exerciseEditValues.repset}
                                    onChange={(e) =>
                                      setExerciseEditValues({ ...exerciseEditValues, repset: e.target.value })
                                    }
                                    className="border p-2 rounded"
                                    placeholder="Serie x Ripetizioni"
                                  />
                                  <input
                                    type="text"
                                    value={exerciseEditValues.rec}
                                    onChange={(e) =>
                                      setExerciseEditValues({ ...exerciseEditValues, rec: e.target.value })
                                    }
                                    className="border p-2 rounded"
                                    placeholder="Recupero"
                                  />
                                  <input
                                    type="text"
                                    value={exerciseEditValues.notes}
                                    onChange={(e) =>
                                      setExerciseEditValues({ ...exerciseEditValues, notes: e.target.value })
                                    }
                                    className="border p-2 rounded"
                                    placeholder="Note"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleEditExercise(day._id)}
                                  >
                                    Salva
                                  </button>
                                  <button
                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                    onClick={() => {
                                      setEditExerciseId(null);
                                      setExerciseEditValues({ name: "", repset: "", rec: "", notes: "" });
                                    }}
                                  >
                                    Annulla
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {index + 1}. {exercise.name}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">Serie:</span> {exercise.repset}
                                    {exercise.rec && (
                                      <>
                                        {" "} | <span className="font-medium">Recupero:</span> {exercise.rec}
                                      </>
                                    )}
                                    {exercise.notes && (
                                      <>
                                        <br />
                                        <span className="font-medium">Note:</span> {exercise.notes}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    className="text-blue-500 hover:text-blue-700 px-2 py-1 text-sm"
                                    onClick={() => {
                                      setEditExerciseId(exercise._id);
                                      setExerciseEditValues({ ...exercise });
                                    }}
                                  >
                                    Modifica
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700 px-2 py-1 text-sm"
                                    onClick={() => handleDeleteExercise(day._id, exercise._id)}
                                  >
                                    Elimina
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Nessun esercizio aggiunto per questo giorno</p>
                  )}
                </div>
              );
            })}
          </div>

          {currentWorkout.days?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aggiungi il primo giorno per iniziare a creare la scheda</p>
            </div>
          )}
        </div>
      )}

      {!currentWorkout && selectedCustomerId && (
        <div className="text-center py-8 text-gray-500">
          <p>Creazione workout in corso...</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCreator;