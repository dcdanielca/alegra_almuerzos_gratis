import { useState, useEffect } from "react";
import RecipeDetail from "../components/RecipeDetail";

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
            <h1 className="text-6xl font-bold text-blue-900 text-center">Recipes</h1>
            <div className="grid grid-cols-12 gap-6 mt-5">
            {
                    recipes.map(recipe => {
                    return (
                        <RecipeDetail key={recipe._id} recipe={recipe}/>
                    )
                })
            }
            </div>
        </section>
    )
}

export default Recipes;