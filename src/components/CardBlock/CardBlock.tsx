import { card } from "../../types";

import style from './style.module.css';
export const CardBlock = ({id,name,logo,cardCount, symbol}:card)=>{

    return(<div className={style.mainBlock}>
        <div>id:{id}</div>
        <div>name:{name}</div>
        <div>logo:{logo}</div>
        <div>symbol:{symbol}</div>
        <div>
        <div>cardCount:(
        <div>total:{cardCount.total}</div>
        <div>official:{cardCount.official}</div></div>)</div>


    </div>)
    
}