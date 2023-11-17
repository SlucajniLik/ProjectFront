import { useEffect, useState } from 'react'
import '../css/Traveler.css'
import {maps } from '../maps'
import { Coin } from './Coin'
import Agent from './Agent'




export default function Traveler()
{

const [map,setMap]=useState(maps[0])
const [agent,setAgent]=useState('Aki')

const [currrentStep,setCurrentStep] = useState(0)
const [stepsTaken,setStepsTaken]=useState([])

const path0=[0,2,1,4,3,0]
const path1 =[0,1,2,3,4,5,6,7,0]
const [path,setPath]=useState(path0)
const currentCoin=path[currrentStep]

const[mode,setMode]=useState("step")
const [once,setOnce]=useState(false)
const agentPosition={x:map[currentCoin][0],y:map[currentCoin][1]}
console.log("Da li se ponovo renderujem")
function step(){
//?
  if(currrentStep === path.length-1) return ;

 //setStepsTaken([...stepsTaken,{id:currrentStep,from:path[currrentStep],to:path[currrentStep+1]}])
  setCurrentStep((prevStep) => prevStep + 1)
  //setCurrentStep(currrentStep+1)
///????



}
function stepBack(){
  //?
    if(currrentStep === 0) return ;
  
   //setStepsTaken([...stepsTaken,{id:currrentStep,from:path[currrentStep],to:path[currrentStep+1]}])
    setCurrentStep((prevStep) => prevStep - 1)
    //setCurrentStep(currrentStep+1)
  ///????
  
  
  
  }
  
  



function startAuto()
{

/*for(var i=0;i<path.length-1;i++)
    {
        setTimeout(
            ()=>{
                step()
               
          },i*1000) 

    }*/


//provera

 /*for (let i in path)
 {
    setTimeout(
        ()=>{
            step()
           
      },1000*i) 
  }*/

 function autoStep(index) {
    if (index === path.length - 1) {
      
      setOnce(false)
      return};
    const tmId=setTimeout(() => {
      step();
      autoStep(index + 1);
    }, 1000);
  }

  autoStep(0);



}




const keyPress=(e) =>
{  e.target.blur()
  e.preventDefault()
   // console.log('Focused Element:', e.target);
   // console.log("pretisnut sam")
   if(mode==='step')
   {
     if(e.keyCode == 39)
{
  console.log(e.keyCode)

  if(mode==='step')
  {
   
   step();
 
  }
  
}

else if(e.keyCode == 37)
{
  console.log(e.keyCode)

  if(mode==='step')
  {
   
   stepBack();
 
  }
  
}
   }
else if((mode==='auto'))
{
  if(e.keyCode == 32)
{

  
  if(once==false )
  {
   startAuto();
   setOnce(true)
  
  }
  else
  {
    console.log("paused")
    
  }

  
}
}
 if(e.keyCode===83 && (mode==="auto" || mode==="step"))
{
    setMode(mode==='auto'? 'step':'auto')
}
}



useEffect(()=>
{
    
  console.log('currentStep:', currrentStep);
  console.log('path.length:', path.length-1);
    document.body.addEventListener('keydown',keyPress);
   
    
    return ()=>{document.body.removeEventListener('keydown',keyPress)

 };
}
,[mode,currrentStep,path])










return(

<div id="container" >

<div>
<button  onClick={()=>{
     
    setMap(maps[0])
    setCurrentStep(0)
    setPath(path0)
  
    
    }}   >Map 0</button>
<button  onClick={()=>{setMap(maps[1])
                        setCurrentStep(0)
                        setPath(path1)
                        
 }}   >Map 1</button>
</div>

<div>
<button  onClick={()=>setAgent("Aki")}   >Aki</button>
<button  onClick={()=>{setAgent("Jocke") }}   >Jocke</button>
<button  onClick={()=>setAgent("Micko")}   >Micko</button>
<button  onClick={()=>setAgent("Uki")}   >Uki</button>
</div>



<div id="game" > 
<div id="main"  >
{<h1 style={{textAlign:'center'}}>{currrentStep}</h1>  }
{mode ==='step' && <h1 style={{textAlign:'center'}}>Step</h1>  }
{map.map(([x,y],id)=> <Coin key={id} number={id} x={x} y={y} />   )}
<Agent  name={agent} x={agentPosition.x}  y={agentPosition.y }   />
</div>
<div id="score">
{/*stepsTaken.map(({id,from,to})=><h3 key={id}>{id} | {from} - {to}</h3>)*/}
</div>
</div>


</div>


)
}