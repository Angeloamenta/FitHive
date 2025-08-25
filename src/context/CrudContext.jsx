
import { createContext, useContext, useEffect, useState } from "react";
import api from "../interceptor/axiosClient";




const CrudContext = createContext();

export const useCrud = ()=> useContext(CrudContext);

export const CrudProvider = ({children})=> {
const URL = import.meta.env.VITE_BASE_URL;

const [selectedCustomerId, setCustomerId] = useState('')

//   add customers
const addCustomer = async (name, lastName) => {
   try {
    const res = await api.post(`${URL}/customers/add`, {
        firstName:name,
        lastName: lastName
    })
    return res
   } catch (error) {
    console.log(error);
    
   }
}


    return(
        <CrudContext.Provider value={{addCustomer, setCustomerId, selectedCustomerId}}>
            {children}
        </CrudContext.Provider>
    )
}