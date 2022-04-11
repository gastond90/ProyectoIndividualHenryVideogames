import React from "react";
import "./Paginated.css"

export function Paginated ({videogamesPerPage, allVideogames, paginated, currentPage}){
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++){
        pageNumber.push(i)
    };

    return (
        <nav>
            <section class="paginacion">
            <ul>
                {pageNumber && pageNumber.map(n => (
                    <li key = {n} >
                        <a href={{n}.html} class="active" onClick={()=> paginated(n)}>{n}</a>
                    </li>
                ))}                              
            </ul>
            </section>
            
        </nav>
        
    )
}