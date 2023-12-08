import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mills from './componentsMills/Mills'
import axios from 'axios'
import Traveler from './componentsTraveler/Traveler'


function App() {

const [data,setData]=useState(null)
const [loading,setLoading]=useState(true)
const [error,setError]=useState(null)


///////

const [games,setGames]=useState(0)





useEffect(
()=>{

async function effect()
{

setLoading(true)
try{
 /* const response = await axios.post('http://127.0.0.1:8000/Mills/Hello/',{name:'amin',code:7889})
   setData(response.data)
   setError(null)*/

}
catch(e)
{
  setError(e)
  setData(null)

}
setLoading(false)

}
effect()

},[])

if(loading)
{
  return <h1>Loading</h1>
}

if(error)
{
  <p>{JSON.stringify(error)}</p>
}

  /*return (
    <>
    <h1>{data.message}</h1>
    <h1>{data.code}</h1>
<Mills/>


   </>
  )*/
/*<p>{data.code}</p>
   <p>{data.message}</p>*/
  return (
    <>
  
<button  onClick={()=>{setGames(0)}}>Pytnik</button>
<button  onClick={()=>{setGames(1)}}>Mills</button>




{  games==0 && <Traveler/>}
{  games==1 && <Mills/>}

   </>
  )








}

export default App
