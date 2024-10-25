import { useEffect, useState } from "react"
import { fetchGetItems } from "../../api/api"
import { card } from "../../types"
import styles from './style.module.css'
import { CardBlock } from "../../components/CardBlock/CardBlock"

export const MainPage = ()=>{

    const [data, setData] = useState<card[]>([])

    const handleItems = async()=>{
        const temp = await fetchGetItems()
        setData(temp)
    }
    useEffect(()=>{
        handleItems()
    },[])
    return(
    
<div className={styles.container}>
				{data.map((item:card) => (
					<CardBlock id={item.id} name={item.name} logo={item.logo} cardCount={item.cardCount} symbol={item.symbol}/>
				))}
			</div>
    )
}

