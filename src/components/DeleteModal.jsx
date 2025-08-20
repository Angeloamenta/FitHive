import { useEffect } from "react";

const DeleteModal = ({ setModal, customer, deleteCustomer }) => {
  const closeModal = () => setModal(false);

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  const handleDelete = ()=> {
    deleteCustomer(customer._id)
    closeModal()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal} // chiude cliccando sullo sfondo
    >
      <div
        className="bg-white w-[30%] h-[50%] p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // impedisce la chiusura cliccando dentro
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-2xl font-bold text-gray-700"
        >
          ×
        </button>

        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Eliminare {customer?.firstName}?</h3>
          <div className="flex gap-4">
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
              Conferma
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded" onClick={closeModal}>
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
