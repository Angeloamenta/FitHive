import { Outlet, NavLink, Navigate, useNavigate, Link,  } from "react-router-dom"
import { useAuth } from "../context/AuthContext"




const Dashboard = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    return (
        <div className="dashboard bg-white text-black h-full flex">
            <div className=" bg-slate-500 w-50 py-6 px-5">
                <div className="welcome text-white text-center">
                    <h2 className="text-2xl" >Benvenuto nella<br/>dashboard</h2>
                    <h3 className="text-2xl font-bold">{user ? user : "Ospite"}</h3>
                </div>
                <ul className="mt-20 text-left text-white flex flex-col gap-4">
                    <li>
                        <NavLink className="hover:underline" to='/dashboard'>Dashboard Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="hover:underline" to='/dashboard/customers'>Utenti</NavLink>
                    </li>

                </ul>
                <div className="mt-20 text-center text-white flex justify-center">
                    <h3 onClick={goHome} className="w-[80%] hover:cursor-pointer hover:bg-black hover:text-white rounded-md">
                        <div>
                            &larr;
                        </div>
                         Torna al sito
                    </h3>
                </div>
                <div className="flex justify-center mt-5">
                    <button className="rounded-md bg-black p-1 text-white" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard