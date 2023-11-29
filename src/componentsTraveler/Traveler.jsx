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








const mt = createMatrixFromExisting(map);


for (let i = 0; i <mt.length; i++) {
  console.log(mt[i]);
}

function greedyDFS(matrix) {
  const numNodes = matrix.length;
  const visited = new Array(numNodes).fill(false);
  const path = [];

  function findMinCostNode(currentNode) {
    let minCost = Infinity;
    let nextNode = null;

    for (let i = 0; i < numNodes; i++) {
      if (!visited[i] && matrix[currentNode][i] < minCost) {
        minCost = matrix[currentNode][i];
        nextNode = i;
      } else if (!visited[i] && matrix[currentNode][i] === minCost) {
        // If cost is the same, choose the one with a smaller node ID
        nextNode = Math.min(nextNode, i);
      }
    }

    return nextNode;
  }

  function dfs(currentNode) {
    visited[currentNode] = true;
    path.push(currentNode);

    const nextNode = findMinCostNode(currentNode);

    if (nextNode !== null) {
      dfs(nextNode);
    }
  }

  for (let i = 0; i < numNodes; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  // Add the return trip to the initial node at the end of the path
  path.push(path[0]);

  return path;
}

// Example usage with the provided matrix
const costMatrix = [
  [0, 7, 6, 10, 13],
  [7, 0, 7, 10, 10],
  [6, 7, 0, 8, 9],
  [10, 10, 8, 0, 6],
  [13, 10, 9, 6, 0]
];

const resultPath = greedyDFS(costMatrix);
console.log('Greedy DFS Path:', resultPath);
















































































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