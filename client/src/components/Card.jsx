import React from "react";
import "./Card.css"

export default function Card ( {image, name, genre}) {
    return (
        <div >
            <div class= "card">
            <img class= "picture "src = {image} alt = "img not found" width="250px" height="200px"/>
            <h3 class= "card" >{name}</h3>
            <p class= "card">Géneros: {genre}</p>
            </div>
        </div>
    );
} 