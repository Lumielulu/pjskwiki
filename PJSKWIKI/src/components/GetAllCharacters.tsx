//este componente renderizara el contenido principal como un absoluto
//es decir, que mostrara TODAS las cartas de TODOS los personajes

import {useEffect, useState } from "react"




interface card{
    CardName: string,
    CharacterName: string,
    date: string,
    image: string, //utiliza la url de amazon web services S3
    image_trained: string
}



//ESTE ES EL COMPONENTE QUE SE ENCARGARA DE RENDERIZAR TODOS LOS PERSONAJES
export function Card({data}: {data: card}){

    const {CardName, CharacterName, date, image} = data
    return(
            <>
                <div id="FUNCTION-THAT-RENDERS">
                    <div id="CARD">
                        <img src={image} alt="CARD-IMAGE" id="CARD-IMAGE" />
                        <h1 id="CARD-TITLE">{CardName}</h1>
                        <p id="CARD-CHARACTER-NAME">{CharacterName}</p>
                        <p id="CARD-DATE">{date}</p>
                    </div>
                </div>
            </>
        )
}



//ESTE ES EL COMPONENTE QUE SE ENCARGARA DE RELLENAR Y DE AQUI SE LLAMARA A LA FUNCION DE ARRIBA
export function FillAllCharacters(){
    const [characters, setCharacters] = useState<card[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllCardsData = async () => {
            
            try {
                const resp = await fetch(`/pjskwiki/getAllCardsData/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const result: card[] = await resp.json();
                setCharacters(result)

            } catch (error) {
                return alert('error al obtener las cartas!')
            }finally{
                setLoading(!loading)
            }


        }
        getAllCardsData()

    }, [])
    if (loading) return <p>Cargando cartas...</p>;

    return(<>
                <div id='ALL-CHARACTERS'>
                    {characters.map((card, index) => (
                        <Card key={index} data={card}></Card>
                    ))}

                </div>
        
    </>)
}