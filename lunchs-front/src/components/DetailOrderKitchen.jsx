import { useState } from "react/cjs/react.development";


function DetailOrderKitchen(props) {
    
    const [render, setRender] = useState(true);
    const [recipeAssigned, setRecipeAssigned] = useState(props.order.recipeName);
    const [ingredients, setIngredients] = useState(props.order.ingredients);

    const setRecipe = function(){
        let recipe = props.recipes[Math.floor(Math.random() * props.recipes.length)];
        fetch('http://127.0.0.1:8000/orders/recipe', {
            method: 'POST',
            body: JSON.stringify({
                "id": props.order._id,
                "recipeId": recipe._id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then( res => res.json())
        .then(data => {
            setRecipeAssigned(data['recipeName'])
        });
    }

    const requestIngredients = function(){
        fetch('http://127.0.0.1:8000/orders/ingredients', {
            method: 'POST',
            body: JSON.stringify({
                "id": props.order._id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then( res => res.json())
        .then(data => {
            if(data['_id']){
                setIngredients(true);
            }else{
                alert("ingredients not avalaible")
            }
        });
    }



    const prepareOrder = function(){
        fetch('http://127.0.0.1:8000/orders/prepare', {
            method: 'POST',
            body: JSON.stringify({
                "id": props.order._id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then( res => res.json())
        .then(data => {
            setRender(false)
            alert("Order made")
        });
    }

    return (
        render && 
        <section>
            <div className="shadow-inner shadow-sm hover:shadow-md p-8">
                <p className="text-2xl mb-5"><strong className="font-bold capitalize">Order:</strong> {props.order._id}</p>
                <p className="mb-5"><strong className="font-bold mb-5 text-xl">Recipe:</strong> {recipeAssigned ? recipeAssigned : 'Unassigned'}</p>
                <p><strong className="font-bold mb-5">Date:</strong> {new Date(props.order.created_at).toString()}</p>
                <p><strong className="font-bold mb-5">Ingredients:</strong> {ingredients ? 'Assigned' : 'Unassigned'}</p>
                {
                    !recipeAssigned &&
                    <button className="mt-5 mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xl font-bold text-center" onClick={setRecipe}>Choose Random Recipe</button>

                }
                {
                    !ingredients && recipeAssigned &&
                    <button className="mt-5 mx-auto bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-xl font-bold text-center" onClick={requestIngredients}>Request Ingredients</button>

                }
                {
                    ingredients && recipeAssigned &&
                    <button className="mt-5 mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xl font-bold text-center"  onClick={prepareOrder}>Prepare</button>
                }
            </div>
        </section>
    )
}

export default DetailOrderKitchen;