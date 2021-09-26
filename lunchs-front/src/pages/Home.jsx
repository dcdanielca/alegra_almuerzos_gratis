import { useState, useEffect } from "react";
import Modal from '../components/Modal';

function Home(){
    const [preparingOrders, setPreparingOrders] = useState([]);

    const getPreparingOrders = function(){
        let mounted = true;
        fetch('http://127.0.0.1:8000/orders/preparing')
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setPreparingOrders(data['orders']);
            }
        })
        return () => mounted = false;
    }

    const createOrder = function() {
        fetch('http://127.0.0.1:8000/orders', {method: 'POST'})
        .then(res => res.json())
        .then(data => {
            getPreparingOrders();
            const modal = document.querySelector('.modal')
            modal.classList.toggle('opacity-0')
            setTimeout(function(){ 
                modal.classList.add('opacity-0')
            }, 2000);
        })
    }

    useEffect(()=>{
        getPreparingOrders();
    }, [])

    return (
        <div className="container mx-auto">
            <section className="text-center mt-10 mb-20 sticky top-0">
                <button onClick={createOrder} className="mt-5 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-4xl font-bold text-center"> Create New Order Here!</button>
                <Modal message="Order successfully created"/>
            </section>
            <section>
                <h2 className="text-4xl font-bold text-blue-900 text-center mb-5">Orders in preparation</h2>
                {
                    preparingOrders.map(order => {
                        return (
                            <div key={order.created_at} className="shadow-inner shadow-sm hover:shadow-md p-8">
                                <p className="text-xl mb-5"><strong className="font-bold ">Recipe:</strong> {order.recipeName ? order.recipeName : 'Unassigned'}</p>
                                <p><strong className="font-bold mb-5">Ingredients:</strong> {order.ingredients ? 'Assigned' : 'Without getting'}</p>
                                <p><strong className="font-bold mb-5">Date:</strong> {new Date(order.created_at).toString()}</p>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default Home;