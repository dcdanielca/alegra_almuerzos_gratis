import Detail from "./Detail";

function DetailsContainer(props) {

    return (
        <section>
                <h2 className="text-4xl font-bold text-blue-900 text-center my-10">{props.title}</h2>
                {
                    props.elements.map(element => {
                        return (
                            <Detail element={element} key={element.created_at} mainKey={props.itemDetailTitle}/>
                        )
                    })
                }
            </section>
    )
}

export default DetailsContainer;