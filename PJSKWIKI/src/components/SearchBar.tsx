//este codigo se utilizara para renderizar el personaje buscado

import { useState } from "react";
import { FullFillData } from "./Card";

interface idGathered{
    id: number,
}




//Esta funcion servira para renderizar el contenido buscado al apretar el boton de buscar
// por ende se le llama primero a la funcion getCharacterId la cual retornara un ID que luego
//se le pasara a la funcion fullfilldata que luego se llama a la funcion card para rellenar los datos
//obtenidos por fullfilldata
export function SearchBar(){

    const [characterId, setId] = useState<number | null>(null)

    
    const getCharacterIdFromName = async (name : string) => {
        try {
            const resp = await fetch(`/pjskwiki/getCharacterId/${name}`, {
                method: 'GET',
                headers: {

                    'Content-Type':'application/json',

                }


            })
            const result: idGathered = await resp.json()      
            setId(result.id)
        } catch (error) {
            return alert('No se ha podido obtener la tarjeta!')
        }


    }

    return(<>
        <div id="SEARCH-BAR">
            <input type="text" id="SEARCH"/>
            <button onClick={() => {
            const input = document.getElementById('SEARCH') as HTMLInputElement;
            const inputName = input?.value.trim();

            if (inputName) {
              getCharacterIdFromName(inputName);
            }
          }}></button>
        </div>
        { characterId !== null && <FullFillData id={characterId}></FullFillData>}
    </>)

}