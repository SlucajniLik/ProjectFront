import  {useState} from 'react'
import '../css/Mills.css'



function Board({position,onClickCircle})
{
   const start=position
   const end=100-start
   const square=position/10-1

   return(
<>

<line className='boardLine'  x1={start} y1={start}  x2={end} y2={start}/>
<line className='boardLine'  x1={end} y1={start}  x2={end} y2={end}/>
<line className='boardLine'  x1={end} y1={end}  x2={start} y2={end}/>
<line className='boardLine'  x1={start} y1={end}  x2={start} y2={start}/>
<circle className='boardCircle'  onClick={()=>onClickCircle(square,0)}   cx={start} cy={start} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,1)}  cx={50} cy={start} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,2)}   cx={end} cy={start} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,3)}     cx={end} cy={50} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,4)}    cx={end} cy={end} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,5)}    cx={50} cy={end} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,6)}    cx={start} cy={end} r={0.5} />
<circle className='boardCircle'  onClick={()=>onClickCircle(square,7)}      cx={start} cy={50} r={0.5} />

</>
   )

}

function Piece({square,index,color})
{

let x=0
let y=0

if(index>=0 && index <3)
{
y=square*10+10

if(index===0)
{
   x=square*10+10


}
else if(index===1)
{
    x=50
}
else if(index===2)
{

x=100-(square*10+10)
}

}
else if(index>=4 && index<7)
{
  y=100-(square*10+10)

  if(index===4)
  {
   x=100-(square*10+10)
  }
  else if (index===5)
  {
    x=50
  }
else if (index===6)
{
    x=square*10+10
}
  
}
else if (index===3)
{
    y=50
    x=100-(square*10+10)
}
else if(index===7)
{
    y=50
    x=square*10+10
}

return (
    <circle cx={x} cy={y} r={3} fill={color}   />
)






}





export default function Mills()
{

   const[pieces,setPices]=useState([
    {square:0,index:0,color:'white'},
    {square:1,index:0,color:'black'},
   ])
   const[color,setColor]=useState('white') 

   function changeColor()
   {
    setColor(cl=>cl==='white'?'black':'white')
   }

function onClickCircle(square,index)
{
    setPices(p=>[...p,{square,index,color}])
    changeColor()
}



    return(
<svg viewBox='0 0 100 100'>

<line className='boardLine'  x1={50} y1={10}  x2={50} y2={30}/>
<line className='boardLine'  x1={70} y1={50}  x2={90} y2={50}/>
<line className='boardLine'  x1={50} y1={70}  x2={50} y2={90}/>
<line className='boardLine'  x1={30} y1={50}  x2={10} y2={50}/>
<Board position={10}  onClickCircle={onClickCircle}  />
<Board position={20}  onClickCircle={onClickCircle}  />
<Board position={30}  onClickCircle={onClickCircle}  />



{/*pieces.map(({square,index,color})=>{ <Piece key={`${square}-${index}-${color}`} square={square}index={index} color={color} />   })*/}
   
{pieces.map(({square,index,color})=> <Piece key={square+"-"+index+"-"+color} square={square}index={index} color={color} />)}

</svg>

    )






}









