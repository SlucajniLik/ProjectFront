import { useState } from 'react'
import '../css/Traveler.css'
import {maps } from '../maps'
import { Coin } from './Coin'
import Agent from './Agent'




export default function Traveler()
{

const [map,setMap]=useState(maps[0])
const [agent,setAgent]=useState('Aki')

const agentPosition={x:map[0][0],y:map[0][1]}

return(

<div id="container" >

<div>
<button  onClick={()=>setMap(maps[0])}   >Map 0</button>
<button  onClick={()=>setMap(maps[1])}   >Map 1</button>
</div>

<div>
<button  onClick={()=>setAgent("Aki")}   >Aki</button>
<button  onClick={()=>setAgent("Jocke")}   >Jocke</button>
<button  onClick={()=>setAgent("Micko")}   >Micko</button>
<button  onClick={()=>setAgent("Uki")}   >Uki</button>
</div>




<div id="main"  >
{map.map(([x,y],id)=> <Coin key={id} number={id} x={x} y={y} />   )}
<Agent  name={agent} x={agentPosition.x}  y={agentPosition.y }   />



</div>



</div>


)
}