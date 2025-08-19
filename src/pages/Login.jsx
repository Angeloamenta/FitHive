import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const navigate = useNavigate()

    const URL = import.meta.env.VITE_BASE_URL

    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeName = (e) => {
        const inputName = e.target.value
        setName(inputName)

    }

    const handleChangePassword = (e) => {
        const inputPassword = e.target.value
        setPassword(inputPassword)

    }

 const login = (e) => {
  e.preventDefault();
  setLoading(true);

  axios.post(`${URL}/auth/login`, {
    name,
    password
  })
    .then(function (res) {
      console.log(res.data.token);
      const token = res.data.token
      localStorage.setItem('token', token)
      setName('');
      setPassword('');

     setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      setLoading(false); // viene eseguito SEMPRE, successo o errore
    });
};




    return (
        <>
            <div className="">
                <div className="uppercase text-center text-4xl">
                    Login
                </div>
                <div className="flex justify-center mt-20">
                    <form className="flex text-2xl flex-col gap-4" onSubmit={login}>
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

                        <button type="submit" className="btn-white">Login</button>
                    </form>
                </div>
                <div className="text-center mt-5">
                        {isLoading && 'Login in corso...'}
                    </div>
            </div>
        </>
    )
}

export default Login