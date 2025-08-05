import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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


function App() {


  return (

    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/schede" element={<Schede/>}/>
        <Route path="/iscritti" element={<Iscritti/>}/>


        <Route path='/utente/:id' element={<CustomerCard/>}/>
        <Route path='/utente/:id/:scheda' element={<CustomerWorkoutDays/>}/>
        <Route path='/utente/:id/:scheda/giorno/:giorno' element={<CustomerWorkoutExercise/>}/>


      </Routes>
      <BottonNav></BottonNav>
    </BrowserRouter>
  )
}

export default App
