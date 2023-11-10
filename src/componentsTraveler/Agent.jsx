import Aki from '../assets/Aki.png'
import Jocke from '../assets/Jocke.png'
import Micko from '../assets/Micko.png'
import Uki from '../assets/Uki.png'
import '../css/Agent.css'




export default function Agent({name,x,y})
{

   const getSrc =() =>{

   switch(name){

   case 'Jocke':return Jocke
   case 'Micko':return Micko
   case 'Uki':return Uki
   default:return Aki;
   }
   }

return <img id="agent"  src={getSrc()}  style={{left:x,top:y}}    alt="agent"/>




}