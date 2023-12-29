import  {useEffect, useState} from 'react'
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

function Piece({square,index,color,colorStroke,selectedPiece,onClickPiece})
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
    <circle cx={x} cy={y} r={3} fill={color}  stroke={selectedPiece?colorStroke:'transparent'}   onClick={()=>onClickPiece(square,index,color)}   />
)
}









export default function Mills()
{

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

console.log(index1,square1,JSON.stringify(prevPiece),JSON.stringify(nextPiece))



 
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
  console.log(" RemovedPiece : "+removedPiece)


  const whiteRemain = pieces.filter(s => s.color === 'white').length
  const blackRemain = pieces.filter(s => s.color === 'black').length 


  if(countBlack==0 && countWhite==0 && whiteRemain==2)
  {

    console.log("Crni je pobedio")
    setWinner("Black")
     setgameOver(true)

  }
  else if(countBlack==0 && countWhite==0 && blackRemain==2)
  {
      setWinner("White")
      setgameOver(true)
      console.log("Beli je pobedio")
  }

console.log("Colorrrrrrrrrrrrrrrrrrrrrrrrrrrrr: "+color)

if(countWhite==0 && countBlack==0)
{
const remainPices = pieces.filter(s => s.color === color)
let checkPiece=false
let colWin=color=='white'?'black':'white'
for(let i=0;i<remainPices.length;i++)
{

  if(isValidPiece(remainPices[i].square,remainPices[i].index,remainPices[i].color)==true)
  {

    console.log(" ODGOVOR:   "+remainPices[i].square,remainPices[i].index,remainPices[i].color)
     checkPiece=true
     break;
  }
}

if(checkPiece==false)
{
  setgameOver(true)
  console.log(colWin+"  je pobedio  u nerasporedu"+checkPiece)
  setWinner(colWin)
}

}



  }, [lines,square,index,color2,countWhite,countBlack,gameOver,pieces,validPieceColor,winner]);



  function checkAllPiecess(color)
  {
      for(let i=0;i<pieces.length;i++)
      {     if(pieces[i].color==color)
        {
          if(addRemoveLine(pieces[i].square,pieces[i].index,pieces[i].color,3)==false)
          {
            console.log("----------"+pieces[i].square,pieces[i].index,color,3)
              return false;
          }
        }
      }
      return true
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
    changeColor()
    setSelectedPiece(null)
    
}


        else if(isValidConnection(selectedPiece.square,selectedPiece.index,square,index,1))
        {
      
        console.log(selectedPiece.square,selectedPiece.index,square,index)
        addRemoveLine(selectedPiece.square,selectedPiece.index,selectedPiece.color,2)
        setSquare(square)
        setIndex(index)
        setColor2(color)
          
          
           
        setPices(pieces.filter(pi=>pi.square!==selectedPiece.square || pi.index !==selectedPiece.index || pi.color!==selectedPiece.color))
        setPices(p=>[...p,{square,index,color}])
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
  console.log("Ovde smooooooooooooooo")
    if(countWhite>0 || countBlack>0)
    {
    if(color=="white")
    {
     setPices(p=>[...p,{square,index,color}])
     addRemoveLine(square,index,color,1)
     setCountWhite(countWhite-1)
     console.log("Whiteeee:: "+color)
     changeColor()
 
    }
 
    if(color=="black")
    {
     setPices(p=>[...p,{square,index,color}])
     addRemoveLine(square,index,color,1)
     setCountBlack(countBlack-1)
     console.log("Black:: "+color)
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

console.log("RemovedPies unutar clickPiece: "+removedPiece)
      if(removedPiece==true && color==colorr)
      {   


        if(addRemoveLine(square,index,colorr,3)==false )
        {
            setPices(pieces.filter(pi=>pi.square!==square || pi.index !== index || pi.color!==colorr))
            setRemovedPiece(false)

        }
        else if(addRemoveLine(square,index,colorr,3)==true && checkAllPiecess(colorr)==true)
        {


            const piece =pieces.find(pi=>pi.square==square && pi.index==index && pi.color==colorr)
            if(piece)
            {
             addRemoveLine(piece.square,piece.index,piece.color,2)
            }      
 
         setPices(pieces.filter(pi=>pi.square!==square || pi.index !== index || pi.color!==colorr))
        setRemovedPiece(false)



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
    


  console.log("square: "+square+" index: "+index+" color : "+color+" mode: "+mode )

     
    if(index %2 !==0 )
    {


           



        const previous=pieces.find(pi=>pi.square==square && pi.index==index-1 && pi.color==color)
        const next=pieces.find(pi=>pi.square==square && pi.index==(index+1)%8  && pi.color==color)
        

        


        if(next!=null && previous!=null )
        {







            console.log("previuous square: "+previous.square+"previous index: "+previous.index+"previous color : "+previous.color+" mode: "+mode )
            console.log("next square: "+next.square+"next index: "+next.index+"next color : "+next.color+" mode: "+mode )



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


                console.log("PREVIOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS2:  "+x1,y1,x2,y2,color)
               setLines((l)=>[...l,{x1,y1,x2,y2,color:color}])
               setRemovedPiece(true)
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

                console.log("NEXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT:  "+x1,y1,x2,y2,color)
                setLines(l=>[...l,{x1,y1,x2,y2,color:color}])
                setRemovedPiece(true)
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
{ lines.map(({x1,y1,x2,y2,color})=><line key={x1+"-"+y1+"-"+x2+"-"+y2+"-"+"-"+color} style={{ stroke:color=='white'?'black':'white', strokeWidth: 0.5}} x1={x1} y1={y1} x2={x2} y2={y2} />)    }  
{pieces.map(({square,index,color})=> <Piece key={square+"-"+index+"-"+color} square={square} index={index} color={color}  colorStroke={validPieceColor}    selectedPiece={selectedPiece?.square==square && selectedPiece?.index==index && selectedPiece?.color==color?true:false}                        onClickPiece={onClickPiece} />)}
 
</svg>
<div>
<h3>Winner:{winner}</h3>
<h3>Current player:{color}</h3>  
<h3>White remaining:{countWhite}</h3>
<h3>Black remaining:{countBlack}</h3>
</div>

</>
    )






}









