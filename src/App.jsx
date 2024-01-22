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



const [games,setGames]=useState(0)
const [type, setType] = useState(null);
const [dificulity, setDificulity] = useState(null);
const [dif, setDif] = useState(null);
const [typeStep, setTypeStep] = useState(null);

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


useEffect(() => {
  // This effect runs after the component has mounted

  // Apply styles or do other tasks here

  
    let  locdif=JSON.parse(localStorage.getItem('dificulity'))
    console.log(locdif+" aaaaaaa")
   setDif(locdif)
  

}, [type]);

if(loading)
{
  return <h1>Loading</h1>
}

if(error)
{
  return<p>{JSON.stringify(error)}</p>
}

if (games === 1 && type === null) {
  return (
    
    <div>
      <h1>Izaberite opciju</h1>
      <button onClick={() => {setType(1) 
        setDificulity(0)}}>Covek protiv coveka</button>
      <button onClick={() => setType(2)}>Covek protiv racunara</button>
      <button onClick={() => setType(3)}>Racunar protiv racunara</button>
    </div>
  );
}


if(games === 1 && dif!=null && type === 2)
{
 
  return (
    
    <div>
      <h1>Izaberite opciju</h1>
  
      <button onClick={() => loadGame()}>Nastavi igru</button>
      <button onClick={() => setNewGame()}>Nova igra</button>
    </div>
  );

}





if (games === 1 && type === 2 && dificulity==null ) {
  return (
    
    <div>
      <h1>Izaberite opciju</h1>
      <button onClick={() => setDificulity(1)}>Lako</button>
      <button onClick={() => setDificulity(2)}>Srednje</button>
      <button onClick={() => setDificulity(3)}>Tesko</button>
    </div>
  );
}


if (games === 1 && type === 3 && typeStep==null) {
  return (
    
    <div>
      <h1>Izaberite opciju</h1>
      <button onClick={() => setTypeStep(1)}>Automatski</button>
      <button onClick={() => setTypeStep(2)}>Korak po korak</button>
      
    </div>
  );
}




if (games === 1 && type === 3 && dificulity==null) {
  return (
    
    <div>
      <h1>Izaberite opciju</h1>
      <button onClick={() => setDificulity(1)}>Lako</button>
      <button onClick={() => setDificulity(2)}>Srednje</button>
      <button onClick={() => setDificulity(3)}>Tesko</button>
    </div>
  );
}


function setNewGame()
{

localStorage.removeItem('pieces')
localStorage.removeItem('moves')
localStorage.removeItem('dificulity')
console.log(dificulity+"  fff "+games+"   dd  "+type+"   pp")
setDificulity(null)
setDif(null)
}

function loadGame()
{
const locdif=JSON.parse(localStorage.getItem('dificulity'))
setDificulity(locdif)
console.log(locdif+"lll")
setDif(null)
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
  <div>
  <button  onClick={()=>{setGames(0)
  setType(null)
  setDificulity(null)
  setTypeStep(null)
  }}>Pytnik</button>
<button  onClick={()=>{setGames(1)
setType(null)
setDificulity(null)
setTypeStep(null)
}}>Mills</button>


  </div>






{  games==0 && <Traveler/>}


{ /* games==1 && <Mills/>*/}
{/*games === 1 && type !== null  && dificulity!=null && <Mills type={type} dificulity={dificulity} />*/}



{games === 1 && type==1 &&  <Mills type={type} dificulity={0}   typeStep={0}  />}
{games === 1 && type ==2  && dificulity!=null && <Mills type={type} dificulity={dificulity}  typeStep={0}  />}
{games === 1 && type ==3  && dificulity!=null && <Mills type={type} dificulity={dificulity} typeStep={typeStep} />}

   </>
  )








}

export default App
