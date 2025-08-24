import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const CustomerContext = createContext();

export const useCustomer = ()=> useContext(CustomerContext);

export const CustomerProvider = ({children})=> {
  const URL = import.meta.env.VITE_BASE_URL;


   const [globalCustomers, setGlobalCustomers] = useState([])

   

   useEffect(() => {
    axios.get(`${URL}/customers`)
    .then((res) => {
        console.log(res.data);  
        setGlobalCustomers(res.data)  
    })
    .catch((err) => {console.log(err);
    })
   }, [])
    return(
        <CustomerContext.Provider value={globalCustomers}>
            {children}
        </CustomerContext.Provider>
    )
}