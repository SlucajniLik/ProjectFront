import  {useEffect, useState} from 'react'
import '../css/Mills.css'

const connections = {
    '0-0': ['0-1', '0-7'],
    '0-1': ['0-0', '0-2', '1-1'],
    '0-2': ['0-1', '0-3'],
    '0-3': ['0-2', '0-4', '1-3'],
    '0-4': ['0-3', '0-5'],
    '0-5': ['0-4', '0-6', '1-5'],
    '0-6': ['0-5', '0-7'],
    '0-7': ['0-6', '0-0', '1-7'],

    '1-0': ['1-1', '1-7'],
    '1-1': ['1-2', '1-0', '0-1', '2-1'],
    '1-2': ['1-3', '1-1'],
    '1-3': ['1-4', '1-2', '0-3', '2-3'],
    '1-4': ['1-5', '1-3'],
    '1-5': ['1-6', '1-4', '0-5', '2-5'],
    '1-6': ['1-7', '1-5'],
    '1-7': ['1-0', '1-6', '0-7', '2-7'],

    '2-0': ['2-1', '2-7'],
    '2-1': ['2-2', '2-0', '1-1'],
    '2-2': ['2-3', '2-1'],
    '2-3': ['2-4', '2-2', '1-3'],
    '2-4': ['2-5', '2-3'],
    '2-5': ['2-6', '2-4', '1-5'],
    '2-6': ['2-7', '2-5'],
    '2-7': ['2-0', '2-6', '1-7'],
}
/*const mills=[[0,'00','01','02']
             [0,'02','03','04']
             [0,'04','05','06'] 
             [0,'06','07','00']
             [0,'10','11','12']
             [0,'10','11','12']
             [0,'10','11','12'] 
             [0,'10','11','12']
             [0,'20','21','22']
             [0,'22','23','24']
             [0,'24','25','26'] 
             [0,'26','27','20']
             [0,'21','11','01']
             [0,'23','13','02']
             [0,'25','15','05']
             [0,'27','17','07'] 
             [0,'10','11','12']





                                ]*/




function areConnected(square1, index1, square2, index2) {
    const key1 = `${square1}-${index1}`;
    const key2 = `${square2}-${index2}`;

    return connections[key1]?.includes(key2);
}









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

function Piece({square,index,color,selectedPiece,onClickPiece})
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
    <circle cx={x} cy={y} r={3} fill={color}    stroke={selectedPiece==true?'green':'transparent'}   onClick={()=>onClickPiece(square,index,color)}      />
)
}





export default function Mills()
{

    const[pieces,setPices]=useState([])
  /* const[pieces,setPices]=useState([
    {square:0,index:0,color:'white'},
    {square:1,index:0,color:'black'},
   ])*/

   const[countWhite,setCountWhite]=useState(9)
   const[countBlack,setCountBlack]=useState(9)

   const[color,setColor]=useState('white') 
   const[selectedPiece,setSelectedPiece]=useState(null)
   const[player,setPlayer]=useState("white")
   const[removedPiece,setRemovedPiece]=useState(false)
   const[clickedPiece,setClickedPiece]=useState(false)

const[selectedSquare,setSelectedSquare]=useState(0)
const[selectedIndex,setSelectedIndex]=useState(0)




   function changeColor()
   {
    setColor(cl=>cl==='white'?'black':'white')
   }


function checkMills(square,index)
{
  if(index %2 !==0 )
  {
const previous=pieces.find(pi=>pi.square==square && pi.index==index-1)
const next=pieces.find(pi=>pi.square==square && pi.index==(index+1)%8)

 if(next!=null && previous!=null && previous.color!=color  && next.color!=color  )
 {
    console.log("Mills postojiiiiiiiiiiiii: moduo 2")

    return true
 }






 const piece=pieces.find(pi=>pi.square===square && pi.index===index)
 console.log("Piecccrrr"+JSON.stringify(piece))


let newLineMill=true

for(let i = 0; i < 3; i++)
{
const piece=pieces.find(pi=>pi.square===i && pi.index===index)
console.log("Pieccc"+JSON.stringify(piece)+"COLOR "+color)
if(piece==undefined || piece.color === color )
{
    newLineMill=false
    break;
}

}

if(newLineMill)
{
    console.log("Mills postojiiiiiiiiiiiii: newLineMill")

return true

}
  }
 
  else{


const previousIndex=index==0?7:index-1
const previousPreviousIndex=index==0?6:index-2
const nexIndex=index+1
const nextNextIndex=(index+2)%8


const previousPiece=pieces.find(pi=>pi.square==square && pi.index==previousIndex)
const previousPreviousPiece=pieces.find(pi=>pi.square==square && pi.index==previousPreviousIndex)


if(previousPiece!=null && previousPreviousPiece!=null && previousPiece.color!=color  && previousPreviousPiece.color!=color  )
    {
       console.log("Mills postojiiiiiiiiiiiii: moduo !2 prev prev")

       return true
    }


const nextPiece=pieces.find(pi=>pi.square==square && pi.index==nexIndex)
const nextNextPiece=pieces.find(pi=>pi.square==square && pi.index==nextNextIndex)


if(nextPiece!=null && nextNextPiece!=null && nextPiece.color!=color  && nextNextPiece.color!=color  )
    {
       console.log("Mills postojiiiiiiiiiiiii: moduo !2 next next")

       return true
    }














  }







return false
}
   

function onClickCircle(square,index)
{

   if(removedPiece)
   {
    return true
   }




console.log("ss: "+JSON.stringify(selectedPiece))


setSelectedSquare(square)
setSelectedIndex(index)



if(selectedPiece==null)
{
    


       
   if(color=="white" && countWhite>0)
   {
    setCountWhite(countWhite-1)
    console.log("COLOR:   "+color)
    setPices(p=>[...p,{square,index,color}])
   }
   if(color=="black" && countBlack>0 )
   {
    setCountBlack(countBlack-1)
    console.log("COLOR:   "+color)
    setPices(p=>[...p,{square,index,color}])
   }



    changeColor()

}
else{
if(areConnected(selectedPiece.square,selectedPiece.index,square,index))
{
 //setPices(pieces.filter(p=>(p.square!=selectedPiece.square && p.index!=selectedPiece.index && p.color!=selectedPiece.color)))
 setPices(pieces.filter(p=>(p!=selectedPiece)))
    

 setPices(p=>[...p,{square,index,color:selectedPiece.color}])

setSelectedPiece(null)
changeColor()
}
   
  
}

//checkMills(square,index)




  
}

useEffect(() => {

    if(checkMills(selectedSquare,selectedIndex))
    {
        setRemovedPiece(true)

        changeColor()
        //setClickedPiece(false)
    }
    

    
}, [pieces,clickedPiece])


function onClickPiece(square,index,colorr)
{

if(removedPiece)
{

if(color== colorr)
{return;}


setPices(pieces.filter(pi=>pi.square!==square || pi.index !== index))



setRemovedPiece(false)
setClickedPiece(true)


}
else
{


    if(color==colorr)
    {
    const findPiece=pieces.find(pi=>pi.square==square && pi.index==index && pi.color==colorr)
       
        setSelectedPiece(findPiece)
        setClickedPiece(true)
        
    }
       
     console.log("sel : "+JSON.stringify(findPiece))



}




   
}



    return(
        <>
<svg viewBox='0 0 100 100'>

<line className='boardLine'  x1={50} y1={10}  x2={50} y2={30}/>
<line className='boardLine'  x1={70} y1={50}  x2={90} y2={50}/>
<line className='boardLine'  x1={50} y1={70}  x2={50} y2={90}/>
<line className='boardLine'  x1={30} y1={50}  x2={10} y2={50}/>
<Board position={10}  onClickCircle={onClickCircle}  />
<Board position={20}  onClickCircle={onClickCircle}  />
<Board position={30}  onClickCircle={onClickCircle}  />



{/*pieces.map(({square,index,color})=>{ <Piece key={`${square}-${index}-${color}`} square={square}index={index} color={color} />   })*/}
   
{pieces.map(({square,index,color})=> <Piece key={square+"-"+index+"-"+color} square={square} index={index} color={color}  selectedPiece={selectedPiece?.square==square && selectedPiece?.index==index  && selectedPiece?.color==color?true:false}  onClickPiece={onClickPiece}     />)}

</svg>
<div>
<h3>Current player:{color}</h3>  
<h3>White remaining:{countWhite}</h3>
<h3>Black remaining:{countBlack}</h3>
</div>

</>
    )






}









