import { useEffect, useState,useRef  } from 'react'
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

const [path,setPath]=useState([0,1,2,3,4,])
const currentCoin=path[currrentStep]

const[mode,setMode]=useState("step")
const [once,setOnce]=useState(false)
const agentPosition={x:map[currentCoin][0],y:map[currentCoin][1]}

var graph;

console.log("Da li se ponovo renderujem")



useEffect(
  ()=>{
  
    graph=createMatrixFromExisting(map)
    if(agent =="Aki")
   {
   setPath(deptFirstSearch(graph))
   console.log("Depth first search: "+deptFirstSearch(graph))
   }
   else if(agent =="Jocke")
   {
    setPath(bruteForceTSP(graph))
    console.log("Brute force search: "+bruteForceTSP(graph))
   }
   else if(agent =="Uki")
   {
    setPath(branchAndBounbd(graph))
    console.log("Branch and bound search: "+branchAndBounbd(graph))
   }
   else if(agent =="Micko")
   {
    setPath(A_Star(graph))
    console.log("A star search: "+A_Star(graph))
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

  return minCostPath;
}




//const resultPath = bruteForceTSP(graph);




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

return currentNode.path
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
 

//branchAndBounbd(graph)


function deptFirstSearch(graph)
{
const numNodes = graph.length;
const visited = new Array(numNodes).fill(false);
visited[0] = true;
let pathStack=[0]

let path=[]

while(pathStack.length>0)
{
let currentNode = pathStack.pop()
visited[currentNode]=true
path.push(currentNode)


if(path.length==numNodes)
{

  path.push(0)

  console.log("Moj greedy searchhhhhhhhhhhhhhhhhhhhhhh: "+path)
  return path
}






let children= graph[currentNode];

let minCost = Infinity
let nextNode = null


for(let i=0;i<children.length;i++)
{
  if(!visited[i] && children[i]<minCost)
  {
    minCost=children[i]
    nextNode=i
  }
   else if (!visited[i] && children[i] === minCost)
   {
    nextNode = Math.min(nextNode, i);
   }

pathStack.push(nextNode)



  
}
}

}




//deptFirstSearch(graph)

class Node2 {

  constructor(current_node,cost,heuristics,sum,path)
  {
    this.current_node=current_node
    this.cost=cost
    this.heuristics=heuristics
    this.sum=sum
    this.path=path
    
  }
  }
  
  function A_Star(graph) {
  
   const numOfNodes=graph.length
  
  let pathQueue=[new Node2(0,0,0,0,[0])]
  
  let MSTcost=0
  
  let Temp=[]
  
  while(pathQueue.length>0)
  {
   
   console.log("Path queue:"+JSON.stringify(pathQueue))
  
    const currentNode = pathQueue.shift();
  

     console.log("trenutni node: "+currentNode.current_node+" trenutna cena: "+currentNode.cost+"hEURISTIKA :"+currentNode.heuristics+"SUMA :"+currentNode.sum+" trenutni put : "+currentNode.path)
  
  
  if(currentNode.path.length==numOfNodes+1)
  {
  
    console.log("Optimalni node: "+currentNode.current_node+" Optimalni cena: "+currentNode.cost+"Optimalni hEURISTIKA :"+currentNode.heuristics+"Optimalni SUMA :"+currentNode.sum+"Optimalni trenutni put : "+currentNode.path)
  
  return currentNode.path
  }
  
  
  
  
  
    const children = graph[currentNode.current_node]
    Temp=makeMatrixForCruskal(graph)
    let k = 0;

    for (k = 1; k < currentNode.path.length; k++) {
      Temp = Temp.filter(item =>!(item[0] === currentNode.path[k] || item[1] === currentNode.path[k]));
      
      
    }
  

    console.log("Temp: "+k+"||"+JSON.stringify(Temp))
   
    
 
  
   console.log("rezzzzzzzzzzz:"+(Temp.length))
    MSTcost=kruskalAlgo(Temp.length,Temp)
   
  for(let  i = 0; i<children.length; i++ )
  {
  if(children[i]!=0  && !currentNode.path.includes(i) && currentNode.path.length<children.length )
  {
    const newPath=currentNode.path.slice()
    
    
    
    
     newPath.push(i)
     
   const newCost = currentNode.cost+children[i]
  
  const sum=newCost+MSTcost


   const newNode = new Node2(i,newCost,MSTcost,sum,newPath)
  
  
  pathQueue.push(newNode)
  
  
  }
  
  
  if(currentNode.path.length==children.length)
  {
    const newPath=currentNode.path.slice()
    
    newPath.push(0)
  
  const newCost = currentNode.cost+children[0]
  const sum=newCost+MSTcost
  const newNode = new Node2(0,newCost,MSTcost,sum,newPath)
  
  
  pathQueue.push(newNode)
  break;
  }
  
  } 
  
  pathQueue.sort((a,b)=>
  {
  if(a.sum!==b.sum)
  {
  return a.sum-b.sum
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
 
  
  
  
 //A_Star(graph)

 

function makeSet(parent,rank,n) 
{ 
	for(let i=0;i<n;i++) 
	{ 
		parent[i]=i; 
		rank[i]=0; 
	} 
} 

function findParent(parent,component) 
{ 
	if(parent[component]==component) 
		return component; 

	return parent[component] = findParent(parent,parent[component]); 
} 

function unionSet(u, v, parent, rank,n) 
{ 
	//this function unions two set on the basis of rank 
	//as shown below 
	u=findParent(parent,u); 
	v=findParent(parent,v); 

	if(rank[u]<rank[v]) 
	{ 
		parent[u]=v; 
	} 
	else if(rank[u]<rank[v]) 
	{ 
		parent[v]=u; 
	} 
	else
	{ 
		parent[v]=u; 
		rank[u]++;//since the rank increases if the ranks of two sets are same 
	} 
} 

function kruskalAlgo(n, edge) 
{ 
	//First we sort the edge array in ascending order 
	//so that we can access minimum distances/cost 
	edge.sort((a, b)=>{ 
		return a[2] - b[2]; 
	}) 
	//inbuilt quick sort function comes with stdlib.h 
	//go to https://www.geeksforgeeks.org/comparator-function-of-qsort-in-c/ 
	//if there is any doubt regarding the function 
	let parent = new Array(n); 
	let rank = new Array(n); 

	makeSet(parent,rank,n);//function to initialize parent[] and rank[] 

	let minCost=0;//to store the minimun cost 

	for(let i=0;i<n;i++) 
	{ 
		let v1=findParent(parent,edge[i][0]); 
		let v2=findParent(parent,edge[i][1]); 
		let wt=edge[i][2]; 

		if(v1!=v2)//if the parents are different that means they are in 
				//different sets so union them 
		{ 
			unionSet(v1,v2,parent,rank,n); 
			minCost+=wt; 
			console.log(edge[i][0] + " -- " + edge[i][1] + " == " + wt); 
		} 
	} 


  return minCost
} 


//Here 5 is the number of edges, can be asked from the user 
//when making the graph through user input 
//3 represents the no of index positions for storing u --> v(adjacent vertices) 
//and its cost/distance; 


// The code is contributed by Arushi Jindal. 

















function makeMatrixForCruskal(matrix)
{
const numNodes = matrix.length;
const visited = new Array(numNodes).fill(false);


let newMatrix=[]
let newNode=[]

for(let i=0;i<matrix.length;i++)
{
  
for(let j=0;j<matrix[i].length;j++)
{
    if(matrix[i][j]!=0 && !visited[j])
 
newMatrix.push([i,j,matrix[i][j]])
  
}
visited[i]=true
}


return newMatrix


}






//////////////////////////////////////////Cruscal
















//const [path,setPath]=useState(resultPath.path)





function step(){
//?
  if(currrentStep === path.length-1) return ;

  graph=createMatrixFromExisting(map)

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+currrentStep)

 setStepsTaken(stepsTaken=>[...stepsTaken,{id:currentStepRef.current,from:path[currentStepRef.current],to:path[currentStepRef.current+1],price:graph[path[currentStepRef.current]][path[currentStepRef.current+1]]}])
  setCurrentStep((prevStep) => prevStep + 1)
  //setCurrentStep(currrentStep+1)
///????



}
function stepBack(){
  //?
    if(currrentStep === 0) return ;
  
stepsTaken.pop()
    setCurrentStep((prevStep) => prevStep - 1)
  
  ///????
  
  
  
  }
  
  
  const currentStepRef = useRef(currrentStep);

  useEffect(() => {
    console.log(currrentStep+" aaaaaaaaaaaasasasas")
    currentStepRef.current = currrentStep;
  }, [currrentStep]);


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
   
    
  
    
    }}   >Map 0</button>
<button  onClick={()=>{setMap(maps[1])
                      setStepsTaken([])
                        setCurrentStep(0)
                       
                    
                       
                        
 }}   >Map 1</button>
</div>

<div>
<button  onClick={()=>{setAgent("Aki") 
setStepsTaken([])
setCurrentStep(0) }  }   >Aki</button>
<button  onClick={()=>{setAgent("Jocke") 
setStepsTaken([])
setCurrentStep(0)}}   >Jocke</button>
<button  onClick={()=>{setAgent("Micko") 
setStepsTaken([])
setCurrentStep(0)  }}   >Micko</button>
<button  onClick={()=>{setAgent("Uki")
setStepsTaken([])
setCurrentStep(0)
}}   >Uki</button>
</div>



<div id="game" > 
<div id="main"  >
{<h1 style={{textAlign:'center'}}>{currrentStep}</h1>  }
{mode ==='step' && <h1 style={{textAlign:'center'}}>Step</h1>  }
{map.map(([x,y],id)=> <Coin key={id} number={id} x={x} y={y} />   )}
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