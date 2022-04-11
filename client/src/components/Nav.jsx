import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <div>
            <div>
                <Link to="/home">
                    <p>Ver todos los juegos</p>
                </Link>
                <Link to="/videogame">
                    <p>Crear Juego</p>
                </Link>
            </div>
        </div>
    )
};
