import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserCircle2 } from "lucide-react";

const Iscritti = () => {
  const URL = import.meta.env.VITE_BASE_URL;

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchCustomers = () => {
    setLoading(true);
    axios.get(`${URL}/customers/`)
      .then(res => setCustomers(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    c.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black bg-[url('/honeycomb-pattern.svg')] bg-repeat p-6">
      <h1 className="text-3xl text-white font-extrabold mb-6 text-center">Iscritti</h1>

      {/* Filtro */}
      <div className="flex gap-2 justify-center mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Cerca per nome..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 p-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={() => setFilter("")}
          className="bg-red-600 hover:bg-red-500 text-white font-semibold p-3 rounded-2xl transition"
        >
          Reset
        </button>
      </div>


      {loading ? (
        <p className="text-center text-gray-400 text-xl mt-12">Caricamento...</p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <Link
                key={customer._id}
                to={`/utente/${customer._id}`}
                className="w-full max-w-md bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 rounded-3xl shadow-lg shadow-purple-600/40 flex items-center gap-4 hover:scale-105 transform transition"
              >
                <UserCircle2 className="w-12 h-12 text-purple-300 flex-shrink-0" />
                <div className="flex flex-col">
                  <p className="text-white text-xl font-semibold">{customer.firstName}</p>
                  <p className="text-white text-xl font-semibold">{customer.lastName}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-xl mt-12">Nessun iscritto trovato.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Iscritti;
