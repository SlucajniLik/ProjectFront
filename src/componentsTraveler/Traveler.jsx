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

console.log("Da li se ponovo renderujem")






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







//const costMatrix = createMatrixFromExisting(map);


////////////////////////////////////////////////stvaranje matrice


////////////////////////////////////////////////Algoritam gredy depth
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
    console.log(minCost)
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

  
      dfs(0);
   
  

  // Add the return trip to the initial node at the end of the path
  path.push(path[0]);

  return path;
}
//const resultPath = greedyDFS(costMatrix);
////////////////////////////////////////////////Algoritam gredy depth




// Example usage with the provided matrix

///////////////////////////////////////////// Brute force
function bruteForceTSP(matrix) {
  const numNodes = matrix.length;

  // Function to calculate the total distance of a path
  function calculateTotalDistance(path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += matrix[path[i]][path[i + 1]];
    }
    totalDistance += matrix[path[path.length - 1]][path[0]]; // Return to the starting position
    return totalDistance;
  }

  // Generate all possible permutations of nodes
  function generatePermutations(nodes) {
    const permutations = [];

    function permute(currentPath, remainingNodes) {
      if (remainingNodes.length === 0) {
        permutations.push([...currentPath, currentPath[0]]); // Return to the starting position (node 0)
        return;
      }

      for (let i = 0; i < remainingNodes.length; i++) {
        const newNode = remainingNodes[i];
        const updatedPath = [...currentPath, newNode];
        const updatedRemainingNodes = remainingNodes.filter(node => node !== newNode);
        permute(updatedPath, updatedRemainingNodes);
      }
    }
    ///shallowCopy nodes.slice()????

    permute([0], nodes.slice()); // Start with the initial position (node 0)
    return permutations;
  }

  // Find the path with the minimum cost
  let minCost = Infinity;
  let minCostPath = [];

  const allNodes = Array.from({ length: numNodes - 1 }, (_, i) => i + 1); // Exclude the initial position (node 0)
  const allPermutations = generatePermutations(allNodes);
console.log(allPermutations)
  for (const path of allPermutations) {
   
    const currentCost = calculateTotalDistance(path);
    console.log("currentCost"+minCost)
    if (currentCost < minCost) {
      minCost = currentCost;
      console.log("MinCost"+minCost)
      minCostPath = path;
      console.log("MinCostPath"+minCostPath)
    }
  }

  return { path: minCostPath, totalDistance: minCost };
}


const costMatrix = [
  [0, 7, 6, 10, 13],
  [7, 0, 7, 10, 10],
  [6, 7, 0, 8, 9],
  [10, 10, 8, 0, 6],
  [13, 10, 9, 6, 0]
];

const resultPath = bruteForceTSP(costMatrix);
console.log('Brute-Force TSP Path:', resultPath.path);
console.log('Total Distance:', resultPath.totalDistance);


////////////////////////////////////////////Brute force

////////////////////////////////////Branch nad Bound

class Node {

constructor(current_node,cost,path)
{
  this.current_node=current_node
  this.cost=cost
  this.path=path
}
}

function branchAndBounbd(graph) {

 const numOfNodes=graph.length

let pathQueue=[new Node(0,0,[0])]





while(pathQueue.length>0)
{
 console.log("Path queue:"+JSON.stringify(pathQueue))

  const currentNode = pathQueue.shift();



   console.log("trenutni node: "+currentNode.current_node+" trenutna cena: "+currentNode.cost+" trenutni put : "+currentNode.path)


if(currentNode.path.length==numOfNodes+1)
{

  console.log("optimalni node1: "+currentNode.current_node+" optimalni cena1: "+currentNode.cost+" optimalni put1 : "+currentNode.path)

return
}





  const children = graph[currentNode.current_node]




for(let  i = 0; i<children.length; i++ )
{
if(children[i]!=0  && !currentNode.path.includes(i) && currentNode.path.length<children.length )
{
  const newPath=currentNode.path.slice()
  
   newPath.push(i)

 const newCost = currentNode.cost+children[i]

 const newNode = new Node(i,newCost,newPath)


pathQueue.push(newNode)


}


if(currentNode.path.length==children.length)
{
  const newPath=currentNode.path.slice()
  
  newPath.push(0)

const newCost = currentNode.cost+children[0]

const newNode = new Node(0,newCost,newPath)


pathQueue.push(newNode)
break;
}

} 

pathQueue.sort((a,b)=>
{
if(a.cost!==b.cost)
{
return a.cost-b.cost
}

if(a.path.length!==b.path.length)
{
   return b.path.length-a.path.length
}

return a.current_node-b.current_node


}


)








}









  
}
 /*const raph = [
  [0, 29, 20, 21],
  [29, 0, 15, 17],
  [20, 15, 0, 28],
  [21, 17, 28, 0],
];*/

const raph = [
  [0, 7, 6, 10, 13],
  [7, 0, 7, 10, 10],
  [6, 7, 0, 8, 9],
  [10, 10, 8, 0, 6],
  [13, 10, 9, 6, 0]

];



branchAndBounbd(raph)


///////////////////////////////////////////////Branch and Bound










const [path,setPath]=useState(resultPath.path)
const currentCoin=path[currrentStep]

const[mode,setMode]=useState("step")
const [once,setOnce]=useState(false)
const agentPosition={x:map[currentCoin][0],y:map[currentCoin][1]}
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


///////////////////////////////////////primer



  class TSPNode {
    constructor(value, cost, path) {
      this.value = value
      this.cost = cost
      this.path = path
    }
  }

function branchAndBoundTSPa(graph) {
  const numNodes = graph.length;

  // Initialize the priority queue with the starting node
  let priorityQueue = [new TSPNode(0, 0, [0])];

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.cost - b.cost);
    const currentNode = priorityQueue.shift();

    // If all nodes are visited, return to the starting node
    if (currentNode.path.length === numNodes) {
      currentNode.path.push(0); // Return to the starting node
      console.log("Optimal Path:", currentNode.path);
      console.log("Total Cost:", currentNode.cost);
      return true; // Search successful
    }

    const neighbors = graph[currentNode.value];

    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i] !== 0 && !currentNode.path.includes(i)) {
        const newPath = currentNode.path.slice();
        newPath.push(i);

        const newCost = currentNode.cost + neighbors[i];

        const newNode = new TSPNode(i, newCost, newPath);
        priorityQueue.push(newNode);
      }
    }
  }

  console.log("Optimal path not found.");
  return false; // Search unsuccessful
}

// Example graph for the Traveling Salesman Problem
const graph = [
  [0, 29, 20, 21],
  [29, 0, 15, 17],
  [20, 15, 0, 28],
  [21, 17, 28, 0],
];

// Execute the Branch and Bound algorithm for TSP
branchAndBoundTSPa(graph);




//////////////////////////////////////primer





















return(

<div id="container" >

<div>
<button  onClick={()=>{
     
    setMap(maps[0])
    setCurrentStep(0)
    //setPath(path0)
    setPath(resultPath)
  
    
    }}   >Map 0</button>
<button  onClick={()=>{setMap(maps[1])
                        setCurrentStep(0)
                        //setPath(path1)
                        setPath(resultPath)
                       
                        
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