import { useEffect, useState,useRef  } from 'react'
import '../css/Traveler.css'
import {maps } from '../maps'
import { Coin } from './Coin'
import Agent from './Agent'
import axios from 'axios'
import coin from '../assets/coin.png'
import colectedCoin from '../assets/collected_coin.png'

export default function Traveler()
{

const [map,setMap]=useState(maps[0])
const [agent,setAgent]=useState('Aki')

const [currrentStep,setCurrentStep] = useState(0)
const [stepsTaken,setStepsTaken]=useState([])

const path0=[0,2,1,4,3,0]
const path1 =[0,1,2,3,4,5,6,7,0]

const [path,setPath]=useState([0,1,2,3,4,])
const currentCoin=path[currrentStep]

const[mode,setMode]=useState("step")
const [imgCoin,setImgCoin]=useState(coin)

const agentPosition={x:map[currentCoin][0],y:map[currentCoin][1]}

var graph;

console.log("Da li se ponovo renderujem")

const [collected, setCollected] = useState(new Array(map.length).fill(false));

useEffect(
  ()=>{
  
    graph=createMatrixFromExisting(map)
   
     axios.post('http://127.0.0.1:8000/Pytnik/Search/',{name:agent,matrix:graph}).then(
      
        res=>{
          setPath(res.data.path)
          console.log(res.data.path)}
      
     )
  


    if(agent =="Aki")
   {
  // setPath(deptFirstSearch(graph))
   //console.log("Depth first search: "+deptFirstSearch(graph))
   }
   else if(agent =="Jocke")
   {
   // setPath(bruteForceTSP(graph))
    //console.log("Brute force search: "+bruteForceTSP(graph))
   }
   else if(agent =="Uki")
   {
   // setPath(branchAndBounbd(graph))
    //console.log("Branch and bound search: "+branchAndBounbd(graph))
   }
   else if(agent =="Micko")
   {
   // setPath(A_Star(graph))
    //console.log("A star search: "+A_Star(graph))
   }


  
  },[map,agent])

  //graph=createMatrixFromExisting(maps[0])

////////////////////////////////////////////////stvaranje matrice
function createMatrixFromExisting(existingMatrix) {
  const rows = existingMatrix.length;
  const cols = existingMatrix[existingMatrix.length-1].length-1;
  var newMatrix = [];

  for (let i = 0; i < rows; i++) {
    newMatrix[i] = [];
    for (let j = 0; j < cols; j++) {
      // Copy the value from the existing matrix to the new matrix
      if(existingMatrix[i][j+2]==null)
      {
        newMatrix[i][j]=0
      }
      else
      {
        newMatrix[i][j] = existingMatrix[i][j+2];
      }
      
      
    }
  }






 for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < newMatrix[newMatrix.length-1].length; j++) {
      // Copy the value from the existing matrix to the new matrix
      if(newMatrix[i][j]!=0)
      {
        newMatrix[j][i]=newMatrix[i][j]
      }
     
    }
  }

  return newMatrix;
}


function step(){
//?
  if(currrentStep === path.length-1) return ;

  graph=createMatrixFromExisting(map)

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+currrentStep)

 setStepsTaken(stepsTaken=>[...stepsTaken,{id:currentStepRef.current,from:path[currentStepRef.current],to:path[currentStepRef.current+1],price:graph[path[currentStepRef.current]][path[currentStepRef.current+1]]}])
 setCollected((prevCollected) => {
  const newCollected = [...prevCollected];
  newCollected[path[currentStepRef.current]] = true;
  return newCollected;
});

  setCurrentStep((prevStep) => prevStep + 1)
  
  //setCurrentStep(currrentStep+1)
///????



}
function stepBack(){
  //?
    if(currrentStep === 0) return ;
  
stepsTaken.pop()
setCollected((prevCollected) => {
  const newCollected = [...prevCollected];
  newCollected[path[currentStepRef.current]] = false;
  return newCollected;
});
    setCurrentStep((prevStep) => prevStep - 1)
  
  ///????
  
  
  
  }
  
  
  const currentStepRef = useRef(currrentStep);

  useEffect(() => {
    console.log(currrentStep+" aaaaaaaaaaaasasasas")
    currentStepRef.current = currrentStep;
  }, [currrentStep,collected]);


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
      
      //setOnce(false)
      return};
    /*const tmId=*/setTimeout(() => {
      step();
      
      autoStep(index + 1);
    }, 1000);
  }

  autoStep(0);

//setStepsTaken([])

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

  
 
   startAuto();
  
  
 

  
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
    setStepsTaken([])
    setCurrentStep(0)
    setCollected(new Array(map.length).fill(false))
  
    
  
    
    }}   >Map 0</button>
<button  onClick={()=>{setMap(maps[1])
                      setStepsTaken([])
                        setCurrentStep(0)
                        setCollected(new Array(map.length).fill(false))
                        
                    
                       
                        
 }}   >Map 1</button>
</div>

<div>
<button  onClick={()=>{setAgent("Aki") 
setStepsTaken([])
setCurrentStep(0) 
setCollected(new Array(map.length).fill(false))
}  }   >Aki</button>
<button  onClick={()=>{setAgent("Jocke") 
setStepsTaken([])
setCurrentStep(0)
setCollected(new Array(map.length).fill(false))
}}   >Jocke</button>
<button  onClick={()=>{setAgent("Micko") 
setStepsTaken([])
setCurrentStep(0) 
setCollected(new Array(map.length).fill(false))
 }}   >Micko</button>
<button  onClick={()=>{setAgent("Uki")
setStepsTaken([])
setCurrentStep(0)
setCollected(new Array(map.length).fill(false))

}}   >Uki</button>
</div>



<div id="game" > 
<div id="main"  >
{<h1 style={{textAlign:'center'}}>{currrentStep}</h1>  }
{mode ==='step' && <h1 style={{textAlign:'center'}}>Step</h1>  }
{map.map(([x,y],id)=> <Coin key={id} number={id} x={x} y={y} collected={collected}  />   )}
<Agent  name={agent} x={agentPosition.x}  y={agentPosition.y }   />
</div>
<div id="score">
<h3>-------Steps-------</h3>
  <div style={{ height:'60%'}}   >

{stepsTaken.map(({id,from,to,price})=><h3 key={id}>{id} | {from} - {to} :{price} </h3>)}
</div>
<p style={{display:'flex', justifyContent:'center',alignItems:'center'}}  >Total Price: {stepsTaken.reduce((sum, { price }) => sum + price, 0)}</p>
</div>
</div>


</div>


)

}