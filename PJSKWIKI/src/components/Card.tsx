import { useEffect, useState } from "react"


interface CardData{
    id: number;
    nombre: string;
    descripcion: string;
    foto: string;
    fechaSalida: string;
}


interface props{
    id:number;
}


//ESTA FUNCION RELLENA LA CARTA A BASAE DE LO OBTENIDO EN FULL FILL CARD
export function Card({data}: {data : CardData}){

    const { nombre, descripcion, foto, fechaSalida } = data;
    return(

        <>
            <div id="CARD-CONTENT">
                <div id='CARD-PHOTO'>
                    <img src={foto} alt="CARD-PHOTO"/>
                </div>
                <div id='CARD-DESCRIPTION'>
                    <p id='P-NAME'>{nombre}</p>
                    <p id='P-DESCRIPTION'>{descripcion}</p>
                    <p id='P-DATE'>{fechaSalida}</p>
                    </div>
            </div>
        </>
    )


}


//Esta Funcion es la que sera llamada para rellenar los datos de la carta en cuestion!!!
export function FullFillData({id}: props){
    const [data, setData] = useState<CardData | null >(null)

    useEffect(() => {

        const getData = async () => {

            try {
                const resp = await fetch (`/pjskwiki/getCharacterCard/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                    },

                })
                const result = await resp.json()
                setData(result)

            } catch (error) {
                return <p>Error al obtener la carta!</p>
            }
        }
        getData()
    }, [id  ])

    if(!data) return <p>Obteniendo carta...</p>

    return<Card data={data}/>
}   