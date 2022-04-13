import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getCreated,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import { Paginated } from "./Paginated";
import { SearchBar } from "./SearchBar";
import { FilterByGenre } from "./prueba";
import "./Home.css"
import "./Botones.css"
import "./Card.css"


export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  },[]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterCreated(e) {
    dispatch(getCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div class="home" >
      <div class="home">
      <div><h1></h1></div>
        <div>
          <Link to="/videogame">
            <button class= "botoncrearjuego">CREAR JUEGO</button>
          </Link>
          <div><h1></h1></div>
          <button onClick={(e) => { handleClick(e);}} class= "botonver"> VER JUEGOS </button>
        </div>
        <div><h1></h1></div>
        <div>
          <SearchBar /> 
        </div>
        <div><h1></h1></div>
        <div>
          <FilterByGenre />
        </div>
      </div>

      <div>

      <div class="content-select">
        <select onChange={(e) => handleFilterCreated(e)}>
        <option hidden={true}>Origen</option>
          <option value="All">Todos</option>
          <option value="Created">Creados</option>
          <option value="Existing">Originales</option>
        </select>
        </div>

        <div class="content-select">
          <select onChange={(e) => handleSort(e)}>
          <option hidden={true}>Por Nombre</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          </div>

          <div class="content-select">
          <select onChange={(e) => handleSortRating(e)}>
          <option hidden={true}>Por Puntaje</option>
            <option value="Max-Min">Mejores Primero</option>
            <option value="Min-Max">Peores Primero</option>
          </select>
        </div>
        
        <Paginated
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginated={paginated}
        />
        <div class="videogames">
          
          {
            currentVideogames[0] === "NO" ?
            <img class="imgerr" src="https://i.pinimg.com/736x/73/b6/6d/73b66d9790c99f0bb027f5197e94870b.jpg" alt="" width ="630px" height ="630px"/> :
            allVideogames[0] === "No existe el juego" ? 
            <img class="imgerr" src="https://i.pinimg.com/736x/73/b6/6d/73b66d9790c99f0bb027f5197e94870b.jpg" alt="" /> :
          currentVideogames.length === 0 ?
          <div>
              <button class="loader">LOADING...</button>
          </div> :

          currentVideogames &&
            currentVideogames.map((e) => {
              return (
                <Link class ="card" key ={e.id} to={`/home/${e.id}`}>
                  <Card class ="card" key ={e.id} name={e.name} image={e.image} genre={e.genres?.join(",") } />
                </Link>
                
              );
            })}
        </div>
      </div>
    </div>
  );
}
