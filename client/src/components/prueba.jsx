import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getVideogamesByGenre, getGenres} from "../actions";
import './Home.css'


export function FilterByGenre(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    function handleChange(e) {
        dispatch(getVideogamesByGenre(e.target.value))
    };

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    return (
        <div class="content-select">
             <select onChange = {(e) => handleChange(e)}>
             <option hidden={true}>Géneros</option>
                        {genres.map((e) => (
                            <option key ={e.id} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                   
        </div>
    )
}