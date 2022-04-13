import React from 'react';
import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getDetail,deleteVideogame} from '../actions';
import {useDispatch, useSelector} from "react-redux";
import "./Detail.css"
import "./Botones.css"

export function Detail(){
    const dispatch = useDispatch();
    const {idVideogame} = useParams();
    const aGame = useSelector((state) => state.detail);

    useEffect(() => { 
        dispatch(getDetail(idVideogame));
    },[dispatch]);

    function handleDelete (e){
        e.preventDefault();
        alert('Juego eliminado de la DB')
        dispatch(deleteVideogame(idVideogame));
        
    };

    return(
        <div>
            <div>
            {
                 
                <div>
                {idVideogame.length>6&&<button class="borragame" onClick={handleDelete}>Borrar Juego</button>}

                    <div class="detalle">
                    <h1>{aGame.name}</h1>
                    </div>
                    <img src={aGame.image} alt = "" width="450" height="350"/>
                    <h3 class="detalle">Géneros: {aGame.genres?.join(",")}</h3>
                    <h3 class="detalle">Plataformas: {aGame.platforms?.join(",")}</h3>
                    <h3 class="detalle">Puntaje: {aGame.rating}</h3>
                    <h3 class="detalle">Lanzamiento: {aGame.released}</h3>
                    <h4 class="detalle">Descripción: {aGame.description}</h4>
                </div> 
                
            }
            
            <Link to = '/home'>
                <button class="botondetail">VOLVER</button>
            </Link>
            </div>
            
        </div>
    )

}
