import { useEffect, useState } from "react"


const Schede = () => {

    const [schede, setSchede] = useState([])

useEffect(() => {
console.log("load");


}, [])
    
    return (
        <>
        <h1>Sched</h1>
        </>
    )
}

export default Schede