import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getVideogamesByName} from '../actions';
import "./Botones.css"

export function SearchBar () {
    const dispacht = useDispatch();
    const [name, setName] = useState("");

    function handleInputName (e){
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit (e){
        e.preventDefault();
        dispacht(getVideogamesByName(name));
        setName("");
    };

    return (
        <div>
            <input type = "search" placeholder="Búsqueda por nombre" onChange={e => handleInputName(e)} />
            <button class="botonbuscar" type="submit"  onClick={e => handleSubmit(e)}>Buscar</button>
        </div>
    )
}