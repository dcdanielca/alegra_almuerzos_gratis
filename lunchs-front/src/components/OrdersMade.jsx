import { useEffect, useState } from "react/cjs/react.development";
import DetailsContainer from "./DetailsContainer";

function OrdersMade(){

    const [orders, setOrders] = useState([]);


    useEffect(()=>{
        let mounted = true;

        fetch('http://127.0.0.1:8000/orders/made')
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setOrders(data['orders']);
            }
        })
        return () => mounted = false;
    }, [])

    return (
        <DetailsContainer title="Orders Made" elements={orders} itemDetailTitle="Order"/>
    )
}

export default OrdersMade;