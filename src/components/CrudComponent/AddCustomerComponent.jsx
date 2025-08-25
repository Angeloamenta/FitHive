import { useState } from "react"
import { useCrud } from "../../context/CrudContext"
import { useCustomer } from "../../context/CustomerContext"


const AddCustomerComponent = () => {

    const {fetchCustomers} = useCustomer()
    const { addCustomer } = useCrud()

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleChangeName = (e) => {
        const addingName = e.target.value
        setName(addingName)
    }

    const handleChangeLastName = (e) => {
        const addingLastName = e.target.value
        setLastName(addingLastName)
    }

    const sendCustomer = async (e) => {
  e.preventDefault();
  await addCustomer(name, lastName); 
  setName('');
  setLastName('');
  fetchCustomers(); 
};



    return (
        <div>
            <form onSubmit={sendCustomer}>
                <input
                    type="text"
                    placeholder="nome utente"
                    value={name}
                    onChange={(e) => handleChangeName(e)}
                />
                <input
                    type="text"
                    placeholder="cognome utente"
                    value={lastName}
                    onChange={(e) => handleChangeLastName(e)}
                />


                <button className="button bg-black text-white p-2 rounded-md" type="submit">Aggiungi utente</button>
            </form>
        </div>
    )
}

export default AddCustomerComponent