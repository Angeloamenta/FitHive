import { useAuth } from "../../context/AuthContext";
import { useCustomer } from "../../context/CustomerContext";
import { Users, ClipboardList, Dumbbell } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user } = useAuth();
  const {globalCustomers} = useCustomer();

  // Totale utenti
  const totalCustomers = globalCustomers?.length || 0;

  // Totale schede attive (senza contare schede vuote)
  const activePlans = (globalCustomers || []).reduce((acc, customer) => {
    if (customer.workoutPlans?.length > 0) {
      // consideriamo solo le prime 2 schede per questioni di visualizzazione
      return acc + Math.min(customer.workoutPlans.length, 2);
    }
    return acc;
  }, 0);

  // Dati per il grafico: 2 barre, utenti vs schede
  const chartData = [
    { name: "Totale Utenti", value: totalCustomers },
    { name: "Totale Schede", value: activePlans },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Benvenuto {user?.username}, nella dashboard FitHive
        </h2>
        <p className="text-gray-500 mt-2">
          Qui trovi una panoramica generale degli iscritti e delle schede attive
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <Users className="h-12 w-12 text-indigo-500 mb-4" />
          <p className="text-3xl font-bold text-indigo-600">{totalCustomers}</p>
          <p className="text-gray-500">Iscritti totali</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <ClipboardList className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">{activePlans}</h3>
          <p className="text-gray-500">Schede attive</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <Dumbbell className="h-12 w-12 text-orange-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">
            {totalCustomers ? Math.floor(activePlans / totalCustomers) : 0}
          </h3>
          <p className="text-gray-500">Schede per utente</p>
        </div>
      </div>

      {/* Grafico utenti vs schede */}
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Rapporto Utenti / Schede
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
