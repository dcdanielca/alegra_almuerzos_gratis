import { useState, useEffect } from "react";
import DetailsContainer  from "../components/DetailsContainer";

function Home(){
    const [preparingOrders, setPreparingOrders] = useState([]);

    const getPreparingOrders = function(){
        let mounted = true;
        fetch(`http://ec2-3-83-226-58.compute-1.amazonaws.com:8000/orders/preparing`)
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setPreparingOrders(data['orders']);
            }
        })
        return () => mounted = false;
    }

    const createOrder = function() {
        fetch('http://ec2-3-83-226-58.compute-1.amazonaws.com:8000/orders', {method: 'POST'})
        .then(res => res.json())
        .then(() => {
            getPreparingOrders();
            alert("Order successfully created")
        })
    }

    useEffect(()=>{
        getPreparingOrders();
    }, [])

    return (
        <div className="container mx-auto">
            <section className="text-center mt-10">
                <button onClick={createOrder} className="mt-5 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-4xl font-bold text-center"> Create New Order Here!</button>
            </section>
            <DetailsContainer title="Orders in preparation" elements={preparingOrders} itemDetailTitle="Recipe"/>
        </div>
    )
}

export default Home;