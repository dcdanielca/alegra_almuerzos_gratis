import { useState, useEffect } from "react";

function Recipes(){
    const [recipes, setRecipes] = useState([]);
    
    useEffect(()=>{
        let mounted = true;

        fetch('http://127.0.0.1:8000/recipes')
        .then(res => res.json())
        .then(data => {
            if(mounted){
                setRecipes(data['recipes']);
            }
        })
        return () => mounted = false;
    }, [])

    return (
        <section className="container mx-auto px-4"> 
            <h1 class="text-6xl font-bold text-blue-900 text-center">Recipes</h1>
            <div className="grid grid-cols-12 gap-6 mt-5">
            {
                    recipes.map(recipe => {
                    return (
                        <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white rounded-lg p-6 shadow-sm hover:shadow-xl" key={recipe.name}>
                            <h2 class="text-3xl font-bold text-blue-900">{recipe.name}</h2>
                            <img className="h-64 w-auto rounded-full mx-auto" src={recipe.image} alt={recipe.name}></img>
                            <h3 className="mt-6 font-bold underline">Ingredients</h3>
                            <ul className="text-left list-inside list-disc">
                                {Object.entries(recipe.ingredients).map(ingredient => {
                                    return (<li className="capitalize text-lg" key={ingredient[0]}><strong>{ingredient[0]}:</strong> {ingredient[1]}</li>)
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}

export default Recipes;