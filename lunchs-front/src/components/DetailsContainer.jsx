import Detail from "./Detail";

function DetailsContainer({title, elements, itemDetailTitle}) {

    return (
        <section>
                <h2 className="text-4xl font-bold text-blue-900 text-center my-10">{title}</h2>
                {
                    elements.map(element => {
                        return (    
                            <Detail element={element} key={element.created_at} mainKey={itemDetailTitle}/>
                        )
                    })
                }
            </section>
    )
}

export default DetailsContainer;