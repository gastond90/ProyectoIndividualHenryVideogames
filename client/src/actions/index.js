import axios from 'axios';
import {GET_VIDEOGAMES, FILTER_BY_CREATE, ORDER_BY_NAME, ORDER_BY_RATING,
    FILTER_BY_NAME, FILTER_BY_GENRE, GET_DETAIL, GET_GENRES,GET_PLATFORMS} from './constants';

export function getVideogames (){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/videogames',{});
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    }
};

export function getCreated (payload){
    return {
        type: FILTER_BY_CREATE,
        payload
    }
};

export function orderByName (payload){
    return({
        type: ORDER_BY_NAME,
        payload
    })
};

export function orderByRating (payload){
    return({
        type: ORDER_BY_RATING,
        payload
    })
};

export function getVideogamesByName (payload) {
    return async function (dispatch) {
        try {
            var json2 = await axios.get(`http://localhost:3001/videogames?name=${payload}`,{});
            return dispatch ({
                type: FILTER_BY_NAME,
                payload: json2.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getVideogamesByGenre (payload){
    return async function(dispatch){
        try {
            var json3 = await axios.get(`http://localhost:3001/videogames`,{});
            var json4 = json3.data.filter(e => e.genres.includes(payload));
                return dispatch({
                type: FILTER_BY_GENRE,
                payload:json4
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getPlatforms (){
    return async function(dispatch){
        try {
            var todos = (await axios.get(`http://localhost:3001/videogames`,{})).data;
            var plats=[]
            todos.results.forEach(videogame => {
                plats.push(videogame.platforms.map(pl => pl.platform.name));
            });
                return dispatch({
                type: GET_PLATFORMS,
                payload:[...plats]
            })
        } catch (error) {
            console.log(error)
        }
    }
};


export function getDetail (idVideogame){
    return async function(dispatch){
        try {
            var json5 = await axios.get(`http://localhost:3001/videogames/${idVideogame}`,{});
            return dispatch({
                type: GET_DETAIL,
                payload: json5.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getGenres (){
    return async function (dispatch){
        try {
            var json6 = await axios.get("http://localhost:3001/genre",{});
            return dispatch({
                type: GET_GENRES,
                payload: json6.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function postVideogame (payload){
    return async function(dispatch){
        try {
            var json7 = await axios.post("http://localhost:3001/videogame", payload);
            return json7
        } catch (error) {
            console.log(error)
        }
    }
};

export function deleteVideogame(id) {
    return function() {
        axios.delete(`http://localhost:3001/videogames/${id}`)
        .catch((error) => {
            console.log(error)
        })
    }
}
