import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Schede from './pages/Schede'

// component
import Navbar from './components/Navbar'




function App() {


  return (

    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/schede" element={<Schede/>}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App
