import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postVideogame, getGenres, getPlatforms} from '../actions/index';
import {plataformas} from './plataformas.js'
import "./Botones.css"
import "./CreateGame.css"
import "./Home.css"

function validate (input){
    let errors = {};
    if(!input.name){ errors.name = "Campo obligatorio"};

    if(!input.description){ errors.description = "Campo obligatorio"};
    
    if(!input.rating || input.rating<0 || input.rating >5){errors.rating = "Campo obligatorio" };
    
    if(input.genre.length === 0 ){errors.genre = "Campo obligatorio"};

    if(input.platform.length === 0){ errors.platform = "Campo obligatorio" };

    return errors
};

export function CreateGame(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
   /*  const platforms = useSelector((state) => state.platforms); */
    const platforms = plataformas
    const [errors, setErrors] = useState({});
    const [input, setinput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platform: [],
        genre: []
    });

    function handleChange(e){
        setinput({
            ...input,
            [e.target.name] : e.target.value
           });
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }));
        
    };

    function handleSelect(e){
        setinput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
    };

    function handleSelect2(e){
        setinput({
            ...input,
            platform:[...input.platform, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!input.name) {return alert('El juego debe tener un nombre')};
        if(!input.description) {return alert('El juego debe tener una descripción')};
        if(!input.rating) {return alert('El juego debe tener un puntaje')};
        if(input.rating < 0 || input.rating > 5)
        {return alert('El puntaje debe estar entre 0 y 5')};
        if(input.genre.length === 0) {return alert('El juego debe tener al menos un género')};
        if(input.platform.length === 0) {return alert('El juego debe tener al menos una plataforma')};
        dispatch(postVideogame(input));
        alert("Juego creado con éxito");
        setinput({
            image: "",
            name: "",
            description: "",
            released: "",
            rating: "",
            platform: [],
            genre: []
        });
    }

    function handleDelete(p){
      
        setinput({...input,
        platform: input.platform.filter(pl=> pl!==p)})
    }

    function handleDeleteG(g){
        
        setinput({...input,
        genre: input.genre.filter(gen=> gen!==g)})
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

  /*   useEffect(() => {
        dispatch(getPlatforms())
    }, [dispatch]); */

    return (
        <div>
            <Link to ="/home"><button class= "botonvolver">VOLVER</button></Link>
            <h1>Create Videogame</h1>
            <form class= "formulario" onSubmit={(e) => handleSubmit(e)}>
                <div>
                <div>
                <div>
                    <input type="text" value= {input.name} placeholder="Nombre del juego" name = "name" onChange={(e) => handleChange(e)} required/>
                     {errors.name && (<p class="errores">{errors.name}</p>)}
                </div>
                <div>
                    <input type="text" value= {input.description}  placeholder="Descripción del juego" name = "description" onChange={(e) => handleChange(e)} required/>
                    {errors.description && (<p class="errores">{errors.description}</p>)}
                </div>
                <div>
                    <input type="date" value= {input.released} name = "released"  placeholder="Fecha de Lanzamiento" onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <input type="text" value= {input.rating} name = "rating" placeholder="Puntaje" onChange={(e) => handleChange(e)} required/>
                    {errors.rating && (<p p class="errores">{errors.rating}</p>)}
                </div>
                <div>
                    <input type= "text" value= {input.image} name = "image" placeholder="URL de imagen"  onChange={(e) => handleChange(e)}/>
                </div>
                
                <div>
                <div class="content-select">
                    <select onChange = {(e) => handleSelect2(e)}>
                    <option hidden={true}>Plataformas</option>
                        {platforms.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                    </select>
                    {errors.platform && (<p p class="errores">{errors.platform}</p>)}
                    </div> 

                    <div class="content-select">
                    <select onChange = {(e) => handleSelect(e)}>
                    <option hidden={true}>Géneros</option>
                        {genres.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {errors.genre && (<p p class="errores">{errors.genre}</p>)}
                    </div>

                    </div> 

                    <div class="deleteadores">
            {input.platform.map(p=>
                    <div>
                    <button type="button" class="elegidos" onClick={()=>handleDelete(p)}>{p}</button>
                    </div>
                    )}
                    </div>

             <div class="deleteadores">   
            {input.genre.map(g=>
                    <div>
                    <button type="button" class="elegidos" onClick={()=>handleDeleteG(g)}>{g}</button>
                    </div>
                    )}   
                    </div>

                </div>
                <button type="submit" class= "botoncrear">CREAR</button>
                </div>
                
            </form>
                              
            
        </div>
    )
}