function RecipeDetail(props){
    return(
        <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white rounded-lg p-6 shadow-sm hover:shadow-xl">
        <h2 className="text-3xl font-bold text-blue-900">{props.recipe.name}</h2>
        <img className="h-64 w-auto rounded-full mx-auto" src={props.recipe.image} alt={props.recipe.name}></img>
        <h3 className="mt-6 font-bold underline">Ingredients</h3>
        <ul className="text-left list-inside list-disc">
            {Object.entries(props.recipe.ingredients).map(ingredient => {
                return (<li className="capitalize text-lg" key={ingredient[0]}><strong>{ingredient[0]}:</strong> {ingredient[1]}</li>)
                })
            }
        </ul>
    </div>
    )
}

export default RecipeDetail;