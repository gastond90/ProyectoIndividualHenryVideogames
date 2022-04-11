import {GET_VIDEOGAMES, FILTER_BY_CREATE, ORDER_BY_NAME,ORDER_BY_RATING, FILTER_BY_NAME, 
    FILTER_BY_GENRE, GET_DETAIL, POST_VIDEOGAME, GET_GENRES,GET_PLATFORMS} from '../actions/constants';

const initialSate = {
    videogames : [],
    allVideogames : [],
    genres: [],
    detail: [],
    platforms:[]
}

function rootReducer(state = initialSate, action){
    switch(action.type){

    case GET_VIDEOGAMES:
        return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload
        };

    case FILTER_BY_CREATE:
    
    let createdFilter;
                    if (action.payload === "Existing") {
                        let apiGame = state.allVideogames.filter(data => data.id.toString().length < 7)
                        createdFilter = apiGame
                    }
                    if (action.payload === "Created") {
                        let createdGame = state.allVideogames.filter(data => data.id.toString().length > 7)
                        createdFilter = createdGame
                    }
                    if (action.payload === "All") {
                        let allFiltered = state.allVideogames;
                        createdFilter = allFiltered
                    }

                    if (createdFilter.length === 0) {
                        createdFilter = ["NO"]}
                    return {
                        ...state,
                        videogames: createdFilter
                    }

    case ORDER_BY_NAME:
            const orderGames = action.payload === 'az' ? 
            state.videogames.sort((a,b)=>{
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort((a,b)=>{
                if(a.name > b.name){ return -1;}
                if(b.name > a.name){ return 1; }
                return 0;

            })

            return{
                ...state,
                videogames: orderGames
            }
                  
            case ORDER_BY_RATING:
            const orderGamesRating = action.payload === 'Min-Max' ? 
            state.videogames.sort((a,b)=>{
                    if(a.rating > b.rating){ return 1 }
                    if(b.rating > a.rating){ return -1 }
                    return 0;
                }) :
            state.videogames.sort((a,b)=>{
                    if(a.rating > b.rating){ return -1 }
                    if(b.rating > a.rating){ return 1 }
                    return 0;
    
                })
            
            return{
                    ...state,
                    videogames: orderGamesRating
                }

    case FILTER_BY_NAME:
        return {
            ...state,
            videogames: action.payload
        };

    case FILTER_BY_GENRE:
        return {
            ...state,
            videogames: action.payload
        };

    case GET_DETAIL:
        return {
            ...state,
            detail: action.payload
        };

    case POST_VIDEOGAME:
        return{
            ...state
        };
    
    case GET_GENRES:
        return{
            ...state,
            genres: action.payload
        };

    case GET_PLATFORMS:
        return{
            ...state,
            platforms: action.payload
        };
    
    default:
            return state;
    }
};

export default rootReducer;