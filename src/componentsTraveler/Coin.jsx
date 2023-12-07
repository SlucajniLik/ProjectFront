import coin from '../assets/coin.png'
import "../css/Coin.css"

export function Coin({number,x,y})
{

    return <div className='coin'   style={{left:x,top:y}}    >
        <img src={coin} />
        <span>{number}</span>
    </div>
}