import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
const URL = import.meta.env.VITE_BASE_URL


  // Quando l'app si carica, controlla se c'è qualcosa in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  // Funzione di login
  const login = async (name, password) => {
    try {
      const res = await axios.post(`${URL}/auth/login`, {
        name,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.name);

      // Salva anche in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.name);

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Funzione di logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
