import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const Login = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { login, loading } = useAuth();

    const handleChangeName = (e) => {
        const inputName = e.target.value
        setName(inputName)

    }

    const handleChangePassword = (e) => {
        const inputPassword = e.target.value
        setPassword(inputPassword)

    }

const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, password); 
  
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };






    return (
        <>
            <div className="">
                <div className="uppercase text-center text-4xl">
                    Login
                </div>
                <div className="flex justify-center mt-20">
                    <form className="flex text-2xl flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            className="bg-white text-black placeholder-black p-1 rounded-md"
                            type="text"
                            placeholder="nome"
                            value={name}
                            onChange={handleChangeName}
                        />
                        <input
                            className="bg-white text-black placeholder-black p-1 rounded-md"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={handleChangePassword}
                        />

                        <button type="submit" className="btn-white" disabled={loading}>
                          {loading ? "Caricamento..." : "Login"}

                        </button>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default Login