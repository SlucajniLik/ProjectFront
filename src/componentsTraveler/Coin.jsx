import coin from '../assets/coin.png'
import colected from '../assets/collected_coin.png'
import "../css/Coin.css"
import  {useEffect} from 'react'
export function Coin({number,x,y,collected})
{
    console.log(collected[number]+"aaaaaa"+number)





    if(collected[number]==true)
    {
        return <div className='coin'   style={{left:x,top:y}}    >
        <img src={colected} />
        <span>{number}</span>
        
    
    </div>
    }
    else
    {

        return <div className='coin'   style={{left:x,top:y}}    >
        <img src={coin} />
        <span>{number}</span>
        
        
    </div>

      
    }
    
}