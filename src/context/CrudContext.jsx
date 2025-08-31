import { createContext, useContext, useState } from "react";
import api from "../interceptor/axiosClient";

const CrudContext = createContext();
export const useCrud = () => useContext(CrudContext);

export const CrudProvider = ({ children }) => {
  const URL = import.meta.env.VITE_BASE_URL;
  const [selectedCustomerId, setCustomerId] = useState("");

  // --- CUSTOMER ---
  const addCustomer = async (name, lastName) => {
    try {
      const res = await api.post(`${URL}/customers/add`, {
        firstName: name,
        lastName: lastName,
      });
      setCustomerId(res.data._id);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // --- WORKOUT PLAN ---
  const addWorkout = async (customerId = selectedCustomerId, data = {}) => {
    try {
      if (!customerId) throw new Error("Seleziona un customer");
      const res = await api.post(`${URL}/customers/${customerId}/workout`, data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteWorkout = async (planId, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      return await api.delete(`${URL}/customers/${customerId}/workout/${planId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const editPlan = async (planId, data, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      return await api.patch(`${URL}/customers/${customerId}/workout/${planId}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // --- DAY ---
  const addDay = async (planId, dayName, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      const res = await api.post(`${URL}/customers/${customerId}/workout/${planId}/day`, { name: dayName });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteDay = async (planId, dayId, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      return await api.delete(`${URL}/customers/${customerId}/workout/${planId}/day/${dayId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const editDay = async (planId, dayId, data, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      return await api.patch(`${URL}/customers/${customerId}/workout/${planId}/day/${dayId}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // --- EXERCISE ---
  const addExercise = async (planId, dayId, data, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      const res = await api.post(
        `${URL}/customers/${customerId}/workout/${planId}/day/${dayId}/exercise`,
        data
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteExercise = async (planId, dayId, exerciseId, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      return await api.delete(
        `${URL}/customers/${customerId}/workout/${planId}/day/${dayId}/exercise/${exerciseId}`
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const editExercise = async (planId, dayId, exerciseId, data, customerId = selectedCustomerId) => {
    try {
      if (!customerId) throw new Error("Customer ID mancante");
      const res = await api.patch(
        `${URL}/customers/${customerId}/workout/${planId}/day/${dayId}/exercise/${exerciseId}`,
        data
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <CrudContext.Provider
      value={{
        selectedCustomerId,
        setCustomerId,
        addCustomer,
        addWorkout,
        deleteWorkout,
        editPlan,
        addDay,
        deleteDay,
        editDay,
        addExercise,
        deleteExercise,
        editExercise,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};