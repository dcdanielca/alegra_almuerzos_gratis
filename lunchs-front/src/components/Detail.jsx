

function Detail({element, mainKey}) {


    const keysHidden = ['recipeId', 'ingredients'];
    const datesKeys = ['created_at', 'updated_at'];

    return (
        <div className="shadow-inner shadow-sm hover:shadow-md p-8">
            {Object.entries(element).map(pair => {
                if (pair[0] === "_id") {
                    return (
                        <p key={pair[0]} className="text-xl mb-5"><strong className="font-bold capitalize">{mainKey}:</strong> {pair[1]}</p>
                    )
                }
                else if (keysHidden.includes(pair[0])) {
                    return null
                } else if (datesKeys.includes(pair[0])) {
                    return (
                        <p key={pair[0]}><strong className="font-bold mb-5 capitalize">{pair[0]}:</strong> {new Date(pair[1]).toString()}</p>
                    )
                }
                else {
                    return (
                        <p key={pair[0]}><strong className="font-bold mb-5 capitalize">{pair[0]}:</strong> {pair[1]}</p>
                    )
                }
            })
            }
        </div>
    )
}

export default Detail;