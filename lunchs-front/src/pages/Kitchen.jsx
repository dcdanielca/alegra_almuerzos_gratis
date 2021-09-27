import { useState, useEffect } from "react";
import DetailOrderKitchen from "../components/DetailOrderKitchen";
import OrdersMade from "../components/OrdersMade";


function Kitchen() {

    const [preparingOrders, setPreparingOrders] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://ec2-3-83-226-58.compute-1.amazonaws.com:8000/orders/preparing')
            .then(res => res.json())
            .then(data => {
                setPreparingOrders(data['orders']);
            })

        fetch('http://ec2-3-83-226-58.compute-1.amazonaws.com:8000/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data['recipes']);
            })
    }, [])

    return (
        <section className="grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 md:col-span-6">
                <h2 className="text-4xl font-bold text-blue-900 text-center my-10">Orders in preparation</h2>
                {
                    preparingOrders.map(order => {
                        return (
                            <DetailOrderKitchen order={order} key={order._id} recipes={recipes} className="col-span-12 md:col-span-6" />
                        )
                    })
                }
            </div>
            <div className="col-span-12 md:col-span-6" >
                <OrdersMade/>
            </div>
        </section>
    )
}

export default Kitchen;