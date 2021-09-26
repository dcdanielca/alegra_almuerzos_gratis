import { useState, useEffect } from "react";
import Modal from '../components/Modal';

function Store(){

    const [ingredients, setIngredients] = useState([]);
    const [ingredientBuy, setIngredientBuy] = useState("");
    const [messageModal, setModalMessage] = useState("");
    const [purchases, setPurchases] = useState([]);

    const getIngredients = function(){
        let mounted = true;

        fetch('http://127.0.0.1:8001/ingredients')
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setIngredients(data['ingredients']);
            }
        })
        return () => mounted = false;
    }


    const getPurchases = function(){
        let mounted = true;

        fetch('http://127.0.0.1:8001/purchases')
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setPurchases(data['purchases']);
            }
        })
        return () => mounted = false;
    }
        
    const handleSubmit = (evt) => {
        evt.preventDefault();
        fetch('http://127.0.0.1:8001/ingredients/purchase', {
            method: 'POST',
            body: JSON.stringify({
                "ingredient": ingredientBuy,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then( res => res.json())
        .then(data => {
            if ('quantity' in data){
                getIngredients()
                getPurchases()
                setModalMessage(`Sold ${data['quantity']} units of ${data['ingredient']}`)
                const modal = document.querySelector('.modal')
                modal.classList.toggle('opacity-0')
                setTimeout(function(){ 
                    modal.classList.add('opacity-0')
                }, 2000);
            }else{
                setModalMessage(`No units available for sale`)
                const modal = document.querySelector('.modal')
                modal.classList.toggle('opacity-0')
                setTimeout(function(){ 
                    modal.classList.add('opacity-0')
                }, 2000);
            }
        });
    }

    useEffect(()=>{
        getIngredients()
        getPurchases()
    }, [])


    return (
        <div className="container mx-auto">
            <section className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 md:col-span-6">
                    <h2 className="text-3xl font-bold text-blue-900 mb-5">Available Ingredients</h2>
                    {
                        ingredients.map(ingredient => {
                            return(
                                <p key={ingredient.name} className={`capitalize text-lg ${(ingredient.quantity === 0) ? "text-red-600" : (ingredient.quantity <=2 ) ? 'text-yellow-700' : 'text-green-900'}`}><strong>{ingredient.name}:</strong> {ingredient.quantity}</p> 
                            )
                        })
                    }
                </div>
                <div className="col-span-12 md:col-span-6">
                    <h2 className="text-3xl font-bold text-blue-900 mb-5">Buy Ingredients</h2>
                    <form onSubmit={handleSubmit}>
                        {
                            ingredients.map(ingredient => {
                                    return(
                                        <label key={ingredient.name} className="grid grid-cols-12 mb-2 items-center capitalize">
                                            <input className="w-5 h-5 flex justify-center rounded-full" name="size" type="radio" value={ingredient.name} onChange={e => setIngredientBuy(e.target.value)}/>
                                            {ingredient.name}
                                        </label>
                                    )
                                })
                        }
                        <input className="mt-5 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold text-center" type="submit" value="Buy!"/>
                    </form>
                    <Modal message={messageModal}/>
                </div>
            </section>
            <section>
                <h2 className="mt-10 text-3xl font-bold text-blue-900 mb-5 text-center">Purchases of Ingredients</h2>
                {
                    purchases.map(purchase => {
                        return (
                            <div key={purchase.created_at} className="shadow-inner shadow-sm hover:shadow-md p-8">
                                <p className="text-xl mb-5 capitalize"><strong className="font-bold ">Ingredient:</strong> {purchase.ingredient}</p>
                                <p><strong className="font-bold mb-5">Quantity:</strong> {purchase.quantity}</p>
                                <p><strong className="font-bold mb-5">Date:</strong> {new Date(purchase.created_at).toString()}</p>
                            </div>
                        )
                    })
                }
            </section>
            
        </div>
    )
}

export default Store;