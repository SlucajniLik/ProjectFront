import  {useEffect, useState,useRef} from 'react'
import '../css/Mills.css'
import axios from 'axios'
function Board({position,onClickCircle,color,removedPiece,type})
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
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,0):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,0):undefined}}   cx={start} cy={start} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,1):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,1):undefined}}  cx={50} cy={start} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,2):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,2):undefined}}   cx={end} cy={start} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,3):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,3):undefined}}     cx={end} cy={50} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,4):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,4):undefined}}    cx={end} cy={end} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,5):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,5):undefined}}    cx={50} cy={end} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,6):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,6):undefined}}    cx={start} cy={end} r={0.5} />
<circle className='boardCircle'  onClick={()=>{type==1?onClickCircle(square,7):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickCircle(square,7):undefined}}      cx={start} cy={50} r={0.5} />

</>
   )

}

function Piece({square,index,color,colorStroke,selectedPiece,onClickPiece,removedPiece,type})
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
    <circle cx={x} cy={y} r={3} fill={color}  stroke={selectedPiece?colorStroke:'transparent'}   onClick={()=>{type==1?onClickPiece(square,index,color):type==2 && (color=='white' || (color=='black' && removedPiece==true))?onClickPiece(square,index,color):undefined}}   />
)
}









export default function Mills({type,dificulity})
{

  console.log(type+"    ffff")

    const[pieces,setPices]=useState([])
  /* const[pieces,setPices]=useState([
    {square:0,index:0,color:'white'},
    {square:1,index:0,color:'black'},
   ])*/
   const[lines,setLines]=useState([])
   const[countWhite,setCountWhite]=useState(9)
   const[countBlack,setCountBlack]=useState(9)
   const[color,setColor]=useState('white') 
   const[selectedPiece,setSelectedPiece]=useState(null)
   const[removedPiece,setRemovedPiece]=useState(false)
   const [gameOver,setgameOver]=useState(false)
   const [winner,setWinner]=useState("")
   const [square,setSquare]=useState(null)
   const [index,setIndex]=useState(null)
   const [color2,setColor2]=useState(null)
   const[validPieceColor,setValidPieceColor]=useState('transparent')
   const myInputRef = useRef(null);
  
   const clicked=useRef(null)

   const isComputer=useRef(null)
   

const [movePiece, setMovePiece] = useState(null);
const [removePiece, setRemovePiece] = useState(null);
const [removeTempPiece, setRemoveTempPiece] = useState(null);
const [listMoves, setListMoves] = useState([]);





useEffect(() => {
  // This effect runs after the component has mounted

  // Apply styles or do other tasks here
  const pieces =JSON.parse(localStorage.getItem('pieces')) 
  const moves =JSON.parse(localStorage.getItem('moves')) 

  if(pieces!=null && moves!=null)
  {
   

    setPices(pieces)
    setListMoves(moves)
  }
 
}, []);












function printMoves(square,index)
{
    if(square==0)
    {
      if(index==0)
      {
        return "A1"
      }
      if(index==1)
      {
        return "D1"
      }
      if(index==2)
      {
        return "G1"
      }
      if(index==3)
      {
        return "G4"
      }
      if(index==4)
      {
        return "G7"
      }
      if(index==5)
      {
        return "D7"
      }
      if(index==6)
      {
        return "A7"
      }
      if(index==7)
      {
        return "A4"
      }

    }
   
    if(square==1)
    {
      if(index==0)
      {
        return "B2"
      }
      if(index==1)
      {
        return "D2"
      }
      if(index==2)
      {
        return "F2"
      }
      if(index==3)
      {
        return "F4"
      }
      if(index==4)
      {
        return "F6"
      }
      if(index==5)
      {
        return "D6"
      }
      if(index==6)
      {
        return "B6"
      }
      if(index==7)
      {
        return "B4"
      }
     

    }

    if(square==2)
    {
      if(index==0)
      {
        return "C3"
      }
      if(index==1)
      {
        return "D3"
      }
      if(index==2)
      {
        return "E3"
      }
      if(index==3)
      {
        return "E4"
      }
      if(index==4)
      {
        return "E5"
      }
      if(index==5)
      {
        return "D5"
      }
      if(index==6)
      {
        return "C5"
      }
      if(index==7)
      {
        return "C4"
      }

    }




}




















function play(move,moveRem)
{

  console.log(moveRem+"   iiiiiiiiiiiiiiiiiiiiiiiii")



 if(move[0]=='set')
 {

const {square,index,color} = transformToPiece(move)

onClickCircle(square,index)

if (moveRem!=null)
{
 const {square,index,color} = transformToPiece(moveRem)

 setRemovePiece({square,index,color})

}


 }
 else if(move[0]=='move')
 {    
  const [from,to]=transformToPiece(move)
  onClickPiece(from.square,from.index,from.color)
   if(moveRem==undefined)
   {
    setMovePiece({ square: to.square, index: to.index,color:to.color })
   }
  


  if (moveRem!=null)
{
 
 const {square,index,color} = transformToPiece(moveRem)
 setMovePiece({ square: to.square, index: to.index,color:to.color,removedPi:{square,index,color} })
 //setRemoveTempPiece({square,index,color})

}

 }

 

  
}














//////////////////////////////////////////////////////////////////white
useEffect(() => {

  if (type==1 && dificulity==0 )
  {
    return;
  }

  if(color=='white' )
  {return}
  console.log("Ovde j moveStone:  "+color,removedPiece)
  
  if(color=='black' && removedPiece==true)
  {return}

  if (movePiece) {

 
    onClickCircle(movePiece.square, movePiece.index);
    console.log(JSON.stringify(movePiece.removedPi)+" oooooooooooooooooooooooooooooooooooooo777")
    if(movePiece.removedPi)
    {
      
      setRemoveTempPiece(movePiece.removedPi)
      //setRemovedPiece(true)
    }
    
  }
  setMovePiece(null);



  console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')

}, [movePiece])





useEffect(() => {

 


  if (removePiece)
  {  
    console.log(removePiece.square,removePiece.index,removePiece.color=='white'?'black':'white'+'   LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
     onClickPiece(removePiece.square,removePiece.index,removePiece.color=='white'?'black':'white')
     //setRemovedPiece(false)
  }
  setRemovePiece(null)
    
  
  }, [removePiece])

  useEffect(
    ()=>{
      
     /* if (color=='white')
      return */
  
      if (type==1 && dificulity==0 )
      {
        return;
      }
  
      if(gameOver){return}
    if(removePiece){return}
    if (movePiece){return}
  
     if(color=='white' && removedPiece==false)
      {return}
      if(color === 'black' && removedPiece==true)
      {
        return;
      
      }
      if(checkOneMills(square,index,color2) && color2=='white')
      {
        setSquare(null)
        setIndex(null)
        setColor2(null)
        return;
      }
    
  
     const game=transformToMatrix()
     console.log('pocetna matrica'+JSON.stringify(game))
     console.log(color,removedPiece+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPPPPP")
       axios.post('http://127.0.0.1:8000/Games/Mills/',game).then(
        
          res=>{
            console.log("Ovo je potez:"+res.data.move)
  
           play(res.data.move[0],res.data.move[1])
          
          
          }
        
       )
    
  
  
       console.log(transformToMatrix())
  
  console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU')
    
    },[color,removedPiece])
/////////////////////////////////////////////////////////////////////////////////////////////////////////white
////////////////////////////////////////////////////////////////////////////////////////////////////////black  
useEffect(() => {

  if (type==1 && dificulity==0 )
  {
    return;
  }

  if(type==2)
  {
    return
  }
  if(color=='black' )
  {return}
  console.log("Ovde j moveStone:  "+color,removedPiece)
  
  if(color=='white' && removedPiece==true)
  {return}

  if (movePiece) {

 
    onClickCircle(movePiece.square, movePiece.index);
    console.log(JSON.stringify(movePiece.removedPi)+" oooooooooooooooooooooooooooooooooooooo777")
    if(movePiece.removedPi)
    {
      
      setRemoveTempPiece(movePiece.removedPi)
      //setRemovedPiece(true)
    }
    
  }
  setMovePiece(null);



  console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')

}, [movePiece])





/*useEffect(() => {

 
  if(type==2)
  {
    return
  }

  if (removePiece)
  {  
    console.log(removePiece.square,removePiece.index,removePiece.color=='white'?'black':'white'+'   LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
     onClickPiece(removePiece.square,removePiece.index,removePiece.color=='white'?'black':'white')
     //setRemovedPiece(false)
  }
  setRemovePiece(null)
    
  
  }, [removePiece])*/

  useEffect(
    ()=>{
      
     /* if (color=='white')
      return */
  
      if (type==1 && dificulity==0 )
      {
        return;
      }
      if(type==2)
      {
        return
      }
  if(gameOver){return}
    if(removePiece){return}
    if (movePiece){return}
  
     if(color=='black' && removedPiece==false)
      {return}
      if(color === 'white' && removedPiece==true)
      {
        return;
      
      }
      if(checkOneMills(square,index,color2) && color2=='black')
      {
        setSquare(null)
        setIndex(null)
        setColor2(null)
        return;
      }
    
  
     const game=transformToMatrix()
     console.log('pocetna matrica'+JSON.stringify(game))
     console.log(color,removedPiece+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPPPPP")
       axios.post('http://127.0.0.1:8000/Games/Mills/',game).then(
        
          res=>{
            console.log("Ovo je potez:"+res.data.move)
  
           play(res.data.move[0],res.data.move[1])
          
          
          }
        
       )
    
  
  
       console.log(transformToMatrix())
  
  console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU')
    
    },[color,removedPiece])
////////////////////////////////////////////////////////////////////////////////////////////////////////












    function transformIndex(index) {
      const mapping = [
          [0, 0],  
          [0, 1],  
          [0, 2],  
          [1, 2],
          [2, 2],
          [2, 1],
          [2, 0],
          [1, 0]
      ];
  
      if (index < mapping.length) {
          return mapping[index];
      }
  }
  
function transformToMatrix()
{


  const matrix = [];

  for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
          const column = Array(3).fill(0);
          row.push(column);
      } 
      matrix.push(row);  
  }



  
  pieces.forEach(({square, index,color}) => {
      const currentPlayer = color === 'white' ? 1 : -1;
      const [y, z] = transformIndex(index);
      matrix[square][y][z] = currentPlayer;
     
  });

  const whiteRemain = pieces.filter(s => s.color === 'white').length
  const blackRemain = pieces.filter(s => s.color === 'black').length
  console.log(JSON.stringify(pieces))
const data=
{
  countWhite:countWhite,
  countBlack:countBlack,
  onBoardWhite:whiteRemain,
  onBoardBlack:blackRemain,
  pieces:matrix
}

const information={

  data:data,
  currentPlayer:removedPiece==false?color === 'white' ? 1 : -1:color === 'white' ? -1 : 1,
  isMills:removedPiece,
  hardness:dificulity
}
  return information
}

function transformToPiece(move)
{

if(move[0]=='set')
{
  return TransformMove(move)
}
else if(move[0]=='remove')
{
  return TransformMove(move)
}
else if(move[0]=='move'){
 
 const from=TransformMove([move[0],move[1],move[5],move[6],move[7]])
 const to=TransformMove([move[0],move[1],move[2],move[3],move[4]])
 return [from ,to];
}




}


function TransformMove(move) {
  const [type, player, x, y, z] = move;
  const square = x;

  const indexMapping = {
      '0-0': 0,
      '0-1': 1,
      '0-2': 2,
      '1-2': 3,
      '2-2': 4,
      '2-1': 5,
      '2-0': 6,
      '1-0': 7,
     
  };

  const indexKey = `${y}-${z}`;
  const index = indexMapping[indexKey];

  return { square, index,color: player === 1 ? 'white' : 'black' };
}






   function changeColor()
   {
    setColor(cl=>cl==='white'?'black':'white')
   }


function isValidPiece(square1, index1,color)
{

  const remainPices = pieces.filter(s => s.color ===color).length
 
    if(countWhite==0 && countBlack==0 && remainPices==3)
    {
      return true
    }







  if(index1%2==0)
    {
 
 
     let prev=index1==0?7:index1-1;
     let next=index1+1;
 
    const prevPiece=pieces.find(pi=>pi.square==square1 && pi.index==prev)
    const nextPiece=pieces.find(pi=>pi.square==square1 && pi.index==next)

//console.log(index1,square1,JSON.stringify(prevPiece),JSON.stringify(nextPiece))



 
     if(prevPiece!=null && nextPiece!=null)
     {
         return false
     }
     else
     {
      return true
     }

 
    }
    else
    {
 
      if(square1==0)
      {
       let prev=index1-1;
       let next=(index1+1)%8
       let down=square1+1

       const prevPiece=pieces.find(pi=>pi.square==square1 && pi.index==prev)
       const nextPiece=pieces.find(pi=>pi.square==square1 && pi.index==next)
       const downPiece=pieces.find(pi=>pi.square==down && pi.index==index1)



 
       if(prevPiece!=null && nextPiece!=null && downPiece!=null)
       {
           return false
       }
       else
       {
        return true
       }
 
      }
      else if(square1==1)
      {
       let prev=index1-1;
       let next=(index1+1)%8
       let up=square1-1
       let down=square1+1
 
       const prevPiece=pieces.find(pi=>pi.square==square1 && pi.index==prev)
       const nextPiece=pieces.find(pi=>pi.square==square1 && pi.index==next)
       const downPiece=pieces.find(pi=>pi.square==down && pi.index==index1)
       const upPiece=pieces.find(pi=>pi.square==up && pi.index==index1)





       if(prevPiece!=null && nextPiece!=null && downPiece!=null && upPiece!=null)
       {
           return false
       }
       else
       {
        return true
       }
 
 
      }
      else if(square1==2)
      {
       let prev=index1-1;
       let next=(index1+1)%8
       let up=square1-1

       const prevPiece=pieces.find(pi=>pi.square==square1 && pi.index==prev)
       const nextPiece=pieces.find(pi=>pi.square==square1 && pi.index==next)
       const upPiece=pieces.find(pi=>pi.square==up && pi.index==index1)



       if(prevPiece!=null && nextPiece!=null &&  upPiece!=null)
       {
           return false
       }
       else
       {
        return true
       }
 
      }
 
    }
}




function isValidConnection(square1, index1, square2, index2)
{

   if(index1%2==0)
   {


    let prev=index1==0?7:index1-1;
    let next=index1+1;


    if((prev==index2 && square1==square2) || (next ==index2  && square1==square2))
    {
        return true
    }

   }
   else
   {

     if(square1==0)
     {
      let prev=index1-1;
      let next=(index1+1)%8
      let down=square1+1

          if((prev==index2 && square1==square2) || (next==index2 && square1==square2) || (down==square2 && index1==index2))
          {
            return true
          }

     }
     else if(square1==1)
     {
      let prev=index1-1;
      let next=(index1+1)%8
      let up=square1-1
      let down=square1+1

      if((prev==index2 && square1==square2) || (next==index2 && square1==square2) || (down==square2 && index1==index2) || (up==square2 && index1==index2))
      {
        return true
      }


     }
     else if(square1==2)
     {
      let prev=index1-1;
      let next=(index1+1)%8
      let up=square1-1
      if((prev==index2  && square1==square2) || (next==index2 && square1==square2) ||  (up==square2 && index1==index2))
      {
        return true
      }

     }

  }

}
   
   useEffect(() => {
    // Update the ref whenever lines state changes
    
    addRemoveLine(square,index,color2,1)
  //console.log(" RemovedPiece : "+removedPiece)
if(countBlack==0 && countWhite==0)
{
  setRemovePiece(removeTempPiece)
  setRemoveTempPiece(null)
}
 


  


  const whiteRemain = pieces.filter(s => s.color === 'white').length
  const blackRemain = pieces.filter(s => s.color === 'black').length 


  if(countBlack==0 && countWhite==0 && whiteRemain==2)
  {

    //console.log("Crni je pobedio")
    setWinner("Black")
     setgameOver(true)

  }
  else if(countBlack==0 && countWhite==0 && blackRemain==2)
  {
      setWinner("White")
      setgameOver(true)
     // console.log("Beli je pobedio")
  }

//console.log("Colorrrrrrrrrrrrrrrrrrrrrrrrrrrrr: "+color)

if(countWhite==0 && countBlack==0)
{
const remainPices = pieces.filter(s => s.color === color)
let checkPiece=false
let colWin=color=='white'?'black':'white'
for(let i=0;i<remainPices.length;i++)
{

  if(isValidPiece(remainPices[i].square,remainPices[i].index,remainPices[i].color)==true)
  {

   // console.log(" ODGOVOR:   "+remainPices[i].square,remainPices[i].index,remainPices[i].color)
     checkPiece=true
     break;
  }
}

if(checkPiece==false)
{
  setgameOver(true)
  //console.log(colWin+"  je pobedio  u nerasporedu"+checkPiece)
  setWinner(colWin)
}

}


console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
  }, [lines,square,index,color2,countWhite,countBlack,gameOver,pieces,validPieceColor,winner,removePiece,removeTempPiece]);



  function checkAllPiecess(color)
  {
      for(let i=0;i<pieces.length;i++)
      {     if(pieces[i].color==color)
        {
          if(addRemoveLine(pieces[i].square,pieces[i].index,pieces[i].color,3)==false)
          {
           // console.log("----------"+pieces[i].square,pieces[i].index,color,3)
              return false;
          }
        }
      }
      return true
  }

function checkOneMills(square,index,color)
{
  if(addRemoveLine(square,index,color,3)==true)
  {
   // console.log("----------"+pieces[i].square,pieces[i].index,color,3)
      return true;
  }
  return false
}




function onClickCircle(square,index)
{ 
  
if(selectedPiece!=null)
{

if(countWhite==0 && countBlack==0 )
{
const whiteRemain = pieces.filter(s => s.color === 'white').length
const blackRemain = pieces.filter(s => s.color === 'black').length 
             



if(whiteRemain==3 && selectedPiece.color=="white")
{

    console.log(selectedPiece.square,selectedPiece.index,square,index)
    addRemoveLine(selectedPiece.square,selectedPiece.index,selectedPiece.color,2)
    setSquare(square)
    setIndex(index)
    setColor2(color)
          


    setPices(pieces.filter(pi=>pi.square!==selectedPiece.square || pi.index !==selectedPiece.index || pi.color!==selectedPiece.color))
    setPices(p=>[...p,{square,index,color}])
    setListMoves(l=>[...l,color+" je pomerio "+ printMoves(selectedPiece.square,selectedPiece.index)+"  na mesto"+printMoves(square,index)])
    changeColor()
    setSelectedPiece(null)
   
       
}
else if(blackRemain==3 && selectedPiece.color=="black")
{

    console.log(selectedPiece.square,selectedPiece.index,square,index)
    addRemoveLine(selectedPiece.square,selectedPiece.index,selectedPiece.color,2)
    setSquare(square)
    setIndex(index)
    setColor2(color)
          



    setPices(pieces.filter(pi=>pi.square!==selectedPiece.square || pi.index !==selectedPiece.index || pi.color!==selectedPiece.color))
    setPices(p=>[...p,{square,index,color}])
    setListMoves(l=>[...l,color+" je pomerio "+ printMoves(selectedPiece.square,selectedPiece.index)+"  na mesto"+printMoves(square,index)])
    changeColor()
    setSelectedPiece(null)
   
       
    
}


        else if(isValidConnection(selectedPiece.square,selectedPiece.index,square,index,1))
        {
      
       // console.log(selectedPiece.square,selectedPiece.index,square,index)
        addRemoveLine(selectedPiece.square,selectedPiece.index,selectedPiece.color,2)
        setSquare(square)
        setIndex(index)
        setColor2(color)
          
          
           
        setPices(pieces.filter(pi=>pi.square!==selectedPiece.square || pi.index !==selectedPiece.index || pi.color!==selectedPiece.color))
        setPices(p=>[...p,{square,index,color}])
        setListMoves(l=>[...l,color+" je pomerio "+ printMoves(selectedPiece.square,selectedPiece.index)+"  na mesto"+printMoves(square,index)])
        changeColor()
        setSelectedPiece(null)

       
        
        }




       }
    }
       else
       {

    
  if(removedPiece==true)
  {
    return;
  } 
  //console.log("Ovde smooooooooooooooo")
    if(countWhite>0 || countBlack>0)
    {
    if(color=="white")
    {
     setPices(p=>[...p,{square,index,color}])
     setListMoves(l=>[...l,color+" je setovao "+printMoves(square,index)])
     addRemoveLine(square,index,color,1)
     setCountWhite(countWhite-1)
    // console.log("Whiteeee:: "+color)
     changeColor()
 
    }
 
    if(color=="black")
    {
     setPices(p=>[...p,{square,index,color}])
     setListMoves(l=>[...l,color+" je setovao "+printMoves(square,index)])
     addRemoveLine(square,index,color,1)
     setCountBlack(countBlack-1)
     //console.log("Black:: "+color)
     changeColor()
 
    }
}
     }
    
    
   
}


function onClickPiece(square,index,colorr)
{

////////////


if(gameOver==true)
{
    return;
}

console.log("RemovedPies unutar clickPieceeeeeeeeeeeeeeeeeee: "+removedPiece,color,colorr)
      if(removedPiece==true && color==colorr)
      {   


        if(addRemoveLine(square,index,colorr,3)==false )
        {
            setPices(pieces.filter(pi=>pi.square!==square || pi.index !== index || pi.color!==colorr))
            setListMoves(l=>[...l,+color=='white'?'black':'white'+" je uklonio "+printMoves(square,index)])
            setRemovedPiece(false)
            myInputRef.current=false

        }
        else if(addRemoveLine(square,index,colorr,3)==true && checkAllPiecess(colorr)==true)
        {


            const piece =pieces.find(pi=>pi.square==square && pi.index==index && pi.color==colorr)
            if(piece)
            {
             addRemoveLine(piece.square,piece.index,piece.color,2)
            }      
 
         setPices(pieces.filter(pi=>pi.square!==square || pi.index !== index || pi.color!==colorr))
         setListMoves(l=>[...l,+color=='white'?'black':'white'+" je uklonio "+printMoves(square,index)])

        setRemovedPiece(false)
        myInputRef.current=false



        }

       
        

      }
      else if(removedPiece==false && color==colorr)
      {

          if(countWhite==0 && countBlack==0)
          {

            



            const piece =pieces.find(pi=>pi.square==square && pi.index==index && pi.color==colorr)
      
                if(isValidPiece(piece.square,piece.index,piece.color)==true)
                {
                  setValidPieceColor('green')
                }
                else if(isValidPiece(piece.square,piece.index,piece.color)==false)
                {
                  setValidPieceColor('red')
                }



            setSelectedPiece(piece)
     
          }

      }
 

}










   
function addRemoveLine(square,index,color,mode)
{
    


 //console.log("square: "+square+" index: "+index+" color : "+color+" mode: "+mode )

     
    if(index %2 !==0 )
    {


           



        const previous=pieces.find(pi=>pi.square==square && pi.index==index-1 && pi.color==color)
        const next=pieces.find(pi=>pi.square==square && pi.index==(index+1)%8  && pi.color==color)
        

        


        if(next!=null && previous!=null )
        {







          //  console.log("previuous square: "+previous.square+"previous index: "+previous.index+"previous color : "+previous.color+" mode: "+mode )
           // console.log("next square: "+next.square+"next index: "+next.index+"next color : "+next.color+" mode: "+mode )



          if(mode==3)
          {
            return true
          }

            let x1;
            let y1;
            let x2;
            let y2;

            if(previous.index==0 && next.index==2)
            {
            
                 x1=previous.square*10+10
                 y1=previous.square*10+10
                 x2=100 - (next.square * 10 + 10)
                 y2=next.square*10+10
            
            }
            else if(previous.index==2 && next.index==4)
            {
            
                x1=100 - (previous.square * 10 + 10)
                y1=previous.square*10+10
                x2=100 - (next.square * 10 + 10)
                y2=100 - (next.square * 10 + 10);
            }
            else if(previous.index==4 && next.index==6)
            {
            
                x1=100 - (previous.square * 10 + 10)
                y1=100 - (previous.square * 10 + 10);
                x2=next.square * 10 + 10;
                y2=100 - (next.square * 10 + 10);
            }
            else if(previous.index==6 && next.index==0)
            {
            
                x1=previous.square * 10 + 10;
                y1=100 - (previous.square * 10 + 10);
                x2=next.square * 10 + 10;
                y2=next.square * 10 + 10;
            }
            if(mode==1)
            {
            const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
            if(li==undefined)
            {
            setLines((l)=>[...l,{x1,y1,x2,y2,color:color}])
            setRemovedPiece(true)
            myInputRef.current=true
            }


            
       
            }
            else if(mode==2)
            {

                const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                if(li)
                {
                setLines((lines)=>lines.filter(li=>li.x1!=x1 || li.y1!==y1 || li.x2!=x2 || li.y2!=y2 || li.color!=color))  
                }
                
            }

        }
       

            let x1;
            let y1;
            let x2;
            let y2;






             if(square==0)
             {
                const next=pieces.find(pi=>pi.square==square+1 && pi.index==index && pi.color==color)
                const nextNext=pieces.find(pi=>pi.square==square+2 && pi.index==index && pi.color==color)
 
            
                  if(next!=null && nextNext!=null)
                  {
                      

                    if(mode==3)
                    {
                      return true
                    }


                    if(index==1)
                    {

                        x1=50
                        y1=square*10+10
                        x2=50
                        y2=nextNext.square*10+10


                    }
                    else if(index==3)
                    {
                        x1=100-(square*10+10)
                        y1=50
                        x2=100-(nextNext.square*10+10)
                        y2=50
                    }
                    else if(index==5)
                    {
                        x1=50
                        y1=100-(square*10+10)
                        x2=50
                        y2=100-(nextNext.square*10+10)
                    }
                    else if(index==7)
                    {
                        x1=square*10+10
                        y1=50
                        x2=nextNext.square*10+10
                        y2=50
                    }
                    if(mode==1)
                    {
                     const tr=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                     if(tr==undefined)
                     {
                     setLines((l)=>[...l,{x1,y1,x2,y2,color:color}])
                     setRemovedPiece(true)
                     myInputRef.current=true
                     }
                    }
                    else if(mode==2)
                    {
        
                        const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                        if(li)
                        {
                        setLines((lines)=>lines.filter(li=>li.x1!=x1 || li.y1!==y1 || li.x2!=x2 || li.y2!=y2 || li.color!=color))  
                        }
                      
                    }
                    

                  }
             }
             else  if(square==1)
             {
                const previous=pieces.find(pi=>pi.square==square-1 && pi.index==index && pi.color==color)
                const next=pieces.find(pi=>pi.square==square+1 && pi.index==index && pi.color==color)
 
            
                  if(previous!=null && next!=null)
                  {


                    if(mode==3)
                    {
                      return true
                    }


                    if(index==1)
                    {

                        x1=50
                        y1=previous.square*10+10
                        x2=50
                        y2=next.square*10+10


                    }
                    else if(index==3)
                    {
                        x1=100-(previous.square*10+10)
                        y1=50
                        x2=100-(next.square*10+10)
                        y2=50
                    }
                    else if(index==5)
                    {
                        x1=50
                        y1=100-(previous.square*10+10)
                        x2=50
                        y2=100-(next.square*10+10)
                    }
                    else if(index==7)
                    {
                        x1=previous.square*10+10
                        y1=50
                        x2=next.square*10+10
                        y2=50
                    }
                    
                    
                    if(mode==1)
                    {
                     const tr=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                     if(tr==undefined)
                     {
                     setLines((l)=>[...l,{x1,y1,x2,y2,color:color}])
                     setRemovedPiece(true)
                     myInputRef.current=true
                     }
                    }
                    else if(mode==2)
                    {
        
                        const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                        if(li)
                        {
                        setLines((lines)=>lines.filter(li=>li.x1!=x1 || li.y1!==y1 || li.x2!=x2 || li.y2!=y2 || li.color!=color))  
                        }
                      
                    }
                    
                  }
             }
             else if(square==2)
             {
                const previous=pieces.find(pi=>pi.square==square-1 && pi.index==index && pi.color==color)
                const previousPrevious=pieces.find(pi=>pi.square==square-2 && pi.index==index && pi.color==color)
 
            
                  if(previous!=null && previousPrevious!=null)
                  {


                    if(mode==3)
                    {
                      return true
                    }




                    if(index==1)
                    {

                        x1=50
                        y1=previousPrevious.square*10+10
                        x2=50
                        y2=square*10+10


                    }
                    else if(index==3)
                    {
                        x1=100-(previousPrevious.square*10+10)
                        y1=50
                        x2=100-(square*10+10)
                        y2=50
                    }
                    else if(index==5)
                    {
                        x1=50
                        y1=100-(previousPrevious.square*10+10)
                        x2=50
                        y2=100-(square*10+10)
                    }
                    else if(index==7)
                    {
                        x1=previousPrevious.square*10+10
                        y1=50
                        x2=square*10+10
                        y2=50
                    }
                    
                    if(mode==1)
                    {
                     const tr=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                     if(tr==undefined)
                     {
                     setLines((l)=>[...l,{x1,y1,x2,y2,color:color}])
                     setRemovedPiece(true)
                     myInputRef.current=true
                     }
                    }
                    else if(mode==2)
                    {
        
                        const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                        if(li)
                        {
                        setLines((lines)=>lines.filter(li=>li.x1!=x1 || li.y1!==y1 || li.x2!=x2 || li.y2!=y2 || li.color!=color))  
                        }
                      
                    }
                    
                  }
             }
           

        }

    
    else
    {


        const previousIndex=index==0?7:index-1
        const previousPreviousIndex=index==0?6:index-2
        const nexIndex=index+1
        const nextNextIndex=(index+2)%8
        
        
        const previousPiece=pieces.find(pi=>pi.square==square && pi.index==previousIndex && pi.color==color)
        const previousPreviousPiece=pieces.find(pi=>pi.square==square && pi.index==previousPreviousIndex && pi.color==color)
        
        
        if(previousPiece!=null && previousPreviousPiece!=null)
            {
               
       
          if(mode==3)
          {
            return true
          }
          let x1;
          let y1;
          let x2;
          let y2;
        
               if(index==0 )
               {
                


                
                x1=square * 10 + 10;
                y1=100 - (square * 10 + 10);
           ///6
                    x2=square*10+10
                    y2=square*10+10
                    //0
                   
               }
               else if(index==2)
               {
               
                x1=square*10+10
                y1=square*10+10
                //0
        
                   x2=100 - (square * 10 + 10)
                   y2=square*10+10
                   //2
                  
               }
               else if(index==4)
               {
                   x1=100 - (square * 10 + 10)
                   y1=square*10+10
                   //2
                   x2=100 - (square * 10 + 10)
                   y2=100 - (square * 10 + 10);
                   //4
                  
               }
               else if(index==6 )
               {
                   x1=100 - (square * 10 + 10)
                   y1=100 - (square * 10 + 10);
                   //4
                   x2=square * 10 + 10;
                   y2=100 - (square * 10 + 10);
                   //6
                  
               }
               if(mode==1)
               {
               const tr=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
               if(tr==undefined)
               {


               // console.log("PREVIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS2:  "+x1,y1,x2,y2,color)
               setLines((l)=>[...l,{x1,y1,x2,y2,color:color}])
               setRemovedPiece(true)
               myInputRef.current=true
               }


               
               
               }
               else if(mode==2)
               {

                const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                if(li)
                {
                setLines((lines)=>lines.filter(li=>li.x1!=x1 || li.y1!==y1 || li.x2!=x2 || li.y2!=y2 || li.color!=color))  
                }
                
               }
              
               
            }
            
        
        
        
        const nextPiece=pieces.find(pi=>pi.square==square && pi.index==nexIndex && pi.color==color)
        const nextNextPiece=pieces.find(pi=>pi.square==square && pi.index==nextNextIndex && pi.color==color )
        
        
        if(nextPiece!=null && nextNextPiece!=null)
        {
               
           
            if(mode==3)
            {
              return true
            }
            let x1;
            let y1;
            let x2;
            let y2;
        
        
               if(index==0 )
               {
               
                    x1=square*10+10
                    y1=square*10+10
                    //0
                    x2=100 - (square * 10 + 10)
                    y2=square*10+10
               ///2
               }
               else if(index==2)
               {
               
                   x1=100 - (square * 10 + 10)
                   y1=square*10+10
                   //2
                   x2=100 - (square * 10 + 10)
                   y2=100 - (square * 10 + 10);
                   //4
               }
               else if(index==4)
               {
               
                   x1=100 - (square * 10 + 10)
                   y1=100 - (square * 10 + 10);
                   x2=square * 10 + 10;
                   y2=100 - (square * 10 + 10);
               }
               else if(index==6 )
               {
               
                   x1=square * 10 + 10;
                   y1=100 - (square * 10 + 10);
                   x2=square * 10 + 10;
                   y2=square * 10 + 10;
               }
               if(mode==1)
               {
               const tr=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
               if(tr==undefined)
               {

               // console.log("NEXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT:  "+x1,y1,x2,y2,color)
                setLines(l=>[...l,{x1,y1,x2,y2,color:color}])
                setRemovedPiece(true)
                myInputRef.current=true
               }

              
     
              }
              else if(mode==2)
              {

                const li=lines.find(li=>li.x1==x1 && li.y1==y1 &&li.x2==x2 &&li.y2==y2 && li.color==color )
                if(li)
                {
                setLines((lines)=>lines.filter(li=>li.x1!=x1 || li.y1!==y1 || li.x2!=x2 || li.y2!=y2 || li.color!=color))  
                }
               
              }
        }

    }


    if(mode==3)
    {
      return false
    }

}





function saveGame()
{

localStorage.setItem('pieces',JSON.stringify(pieces))
localStorage.setItem('moves',JSON.stringify(listMoves))



}


    return(
      <>  
        <div style={{display:'flex',justifyContent:"space-between",width:'1200px'}}>
          <div>

<h3>Beli:{countWhite}</h3>
<h3>Crni:{countBlack}</h3>
<h3> Broj belih na tabli:{pieces.filter(s => s.color === 'white').length}</h3>
<h3>Broj crnih na tabli:{pieces.filter(s => s.color === 'black').length}</h3>
</div>
  
<svg viewBox='0 0 100 100'>

<text x="4" y="12" fontSize="4" fontWeight="bold" fill="black">1</text>
<text x="4" y="22" fontSize="4" fontWeight="bold" fill="black">2</text>
<text x="4" y="32" fontSize="4" fontWeight="bold" fill="black">3</text>
<text x="4" y="52" fontSize="4" fontWeight="bold" fill="black">4</text>
<text x="4" y="72" fontSize="4" fontWeight="bold" fill="black">5</text>
<text x="4" y="82" fontSize="4" fontWeight="bold" fill="black">6</text>
<text x="4" y="92" fontSize="4" fontWeight="bold" fill="black">7</text>


<text x="8" y="96.5" fontSize="4" fontWeight="bold" fill="black">A</text>
<text x="18" y="96.5" fontSize="4" fontWeight="bold" fill="black">B</text>
<text x="28" y="96.5" fontSize="4" fontWeight="bold" fill="black">C</text>
<text x="48" y="96.5" fontSize="4" fontWeight="bold" fill="black">D</text>
<text x="68" y="96.5" fontSize="4" fontWeight="bold" fill="black">E</text>
<text x="78" y="96.5" fontSize="4" fontWeight="bold" fill="black">F</text>
<text x="88" y="96.5" fontSize="4" fontWeight="bold" fill="black">G</text>


<line className='boardLine'  x1={50} y1={10}  x2={50} y2={30}/>
<line className='boardLine'  x1={70} y1={50}  x2={90} y2={50}/>
<line className='boardLine'  x1={50} y1={70}  x2={50} y2={90}/>
<line className='boardLine'  x1={30} y1={50}  x2={10} y2={50}/>

<Board position={10}  onClickCircle={onClickCircle}  color={color}  removedPiece={removedPiece} type={type}  />
<Board position={20}  onClickCircle={onClickCircle} color={color}  removedPiece={removedPiece} type={type} />
<Board position={30}  onClickCircle={onClickCircle}  color={color}  removedPiece={removedPiece} type={type} />



{/*pieces.map(({square,index,color})=>{ <Piece key={`${square}-${index}-${color}`} square={square}index={index} color={color} />   })*/}
{ lines.map(({x1,y1,x2,y2,color})=><line key={x1+"-"+y1+"-"+x2+"-"+y2+"-"+"-"+color} style={{ stroke:color=='white'?'black':'white', strokeWidth: 0.5}} x1={x1} y1={y1} x2={x2} y2={y2} />)    }  
{pieces.map(({square,index,color})=> <Piece key={square+"-"+index+"-"+color} square={square} index={index} color={color}  colorStroke={validPieceColor}    selectedPiece={selectedPiece?.square==square && selectedPiece?.index==index && selectedPiece?.color==color?true:false}  onClickPiece={onClickPiece}    removedPiece={removedPiece} type={type}  />)}
 
</svg>

<div>
<button  onClick={()=>saveGame()} >Sacuvaj igru</button>
  <h2>Potezi</h2>
  {<ul>
        {listMoves.map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul>}
</div>
</div>
<h3>Winner:{winner}</h3>
<h3>Current player:{removedPiece==false?color:color=='white'?'black':'white'}</h3>  

</>
    )






}









