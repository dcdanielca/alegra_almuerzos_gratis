import { useState, useEffect } from "react";
import DetailsContainer from "../components/DetailsContainer";

function Store(){

    const [ingredients, setIngredients] = useState([]);
    const [ingredientBuy, setIngredientBuy] = useState("");
    const [purchases, setPurchases] = useState([]);

    const getIngredients = function(){
        let mounted = true;

        fetch('http://ec2-3-83-226-58.compute-1.amazonaws.com:8001/ingredients')
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

        fetch('http://ec2-3-83-226-58.compute-1.amazonaws.com:8001/purchases')
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setPurchases(data['purchases']);
            }
        })
        return () => mounted = false;
    }

    const changeIngredientBuy = function(e){
        setIngredientBuy(e.target.value);
    }
        
    const handleSubmit = (evt) => {
        evt.preventDefault();
        fetch('http://ec2-3-83-226-58.compute-1.amazonaws.com:8001/ingredients/purchase', {
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
                alert(`Sold ${data['quantity']} units of ${data['ingredient']}`)
            }else{
                alert("No units available for sale")
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
                                            <input className="w-5 h-5 flex justify-center rounded-full" name="size" type="radio" value={ingredient.name} onChange={changeIngredientBuy}/>
                                            {ingredient.name}
                                        </label>
                                    )
                                })
                        }
                        <input className="mt-5 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold text-center cursor-pointer" type="submit" value="Buy!"/>
                    </form>
                </div>
            </section>
            <DetailsContainer title="Purchases of Ingredients" elements={purchases} itemDetailTitle="Purchase"/>
            
        </div>
    )
}

export default Store;