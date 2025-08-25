import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Kettlebell from "../components/Kettlebell";
import { Github } from "lucide-react";

const Homepage = () => {
  const [userExists, setUserExists] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("customerData") || "null");
    if (storedCustomer?._id) {
      setUserExists(true);
      setUserId(storedCustomer._id);
    }
  }, []);

  const handleLoginClick = () => {
    if (userExists && userId) {
      navigate(`/utente/${userId}`);
    }
  };

  return (
    <div className="min-h-screen bg-repeat flex flex-col justify-center items-center p-6">
      
      <div className="relative flex flex-col items-center mb-12">
        <Kettlebell />
        <iframe className="w-80 absolute top-55 opacity-70" src="https://lottie.host/embed/35f7bcff-6e5f-43fc-9d85-7bfd33ed0277/mbay5s9ote.lottie"></iframe>
        <iframe className="w-8 hidden top-55 opacity-70" src="https://lottie.host/embed/7723dfb0-fffe-4c54-bfcb-355674451961/dTk8lq4wrg.lottie"></iframe>
        <h1 className="mt-6 text-4xl md:text-5xl text-white font-extrabold tracking-wider text-center">
          Benvenuti su FitHive
        </h1>
        <p className="mt-2 text-gray-400 text-center max-w-md">
          Gestisci le tue schede e tieni traccia dei tuoi allenamenti in modo semplice e immediato.
        </p>
      </div>

      <div className="mb-7 flex flex-col gap-4">
        {userExists ? (
          <button
            onClick={handleLoginClick}
            className="relative inline-block px-8 py-4 font-semibold text-white rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg shadow-purple-500/50 hover:scale-105 transform transition"
          >
            Accedi al tuo account
            <span className="absolute inset-0 rounded-2xl border-2 border-white opacity-20 animate-pulse"></span>
          </button>
        ) : (
          <Link
            to="/iscritti"
            className="relative inline-block px-8 py-4 font-semibold text-white rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/50 hover:scale-105 transform transition text-center"
          >
            Cerca la tua scheda
            <span className="absolute inset-0 rounded-2xl border-2 border-white opacity-20 animate-pulse"></span>
          </Link>
        )}
      </div>

      <footer className="pb-15 text-gray-400 text-center flex flex-col items-center gap-2">
        <p className="flex items-center gap-2">
          Created by Angelo Amenta
          <a href="https://github.com/Angeloamenta" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 text-white hover:text-purple-400 transition" />
          </a>
        </p>
        <p className="text-sm text-gray-500">©2025 FitHive</p>
      </footer>
    </div>
  );
};

export default Homepage;
