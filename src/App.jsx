import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'


// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Schede from './pages/Schede'
import Customers from './pages/Customers';
import Homepage from './pages/Homepage';
import Iscritti from './pages/Iscritti';


// component
import Navbar from './components/Navbar'
import BottonNav from './components/BottomNav';

// components customer
import CustomerCard from './components/CustomerCard'
import CustomerWorkoutDays from './components/CustomerWorkoutDays'
import CustomerWorkoutExercise from './components/CustomerWorkoutExercise'
import NotFoundPage from './pages/NotFoundPage';

//dashboard

import Dashboard from './pages/Dashboard';
import CustomersDashboard from './components/dashboard/CustomersDashboard';
import DashboardHome from './components/dashboard/DashboardHome';

function App() {

  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (

    <>
    {!isDashboard && <Navbar/>}
     
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schede" element={<Schede />} />
        <Route path="/iscritti" element={<Iscritti />} />


        <Route path='/utente/:id' element={<CustomerCard />} />
        <Route path='/utente/:id/:scheda' element={<CustomerWorkoutDays />} />
        <Route path='/utente/:id/:scheda/giorno/:giorno' element={<CustomerWorkoutExercise />} />

        <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<DashboardHome/>} />
        <Route path='customers' element={<CustomersDashboard/>} />
        </Route>


        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <BottonNav></BottonNav>
    </>
  )
}

export default App
