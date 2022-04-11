import React from "react";
import {Link} from 'react-router-dom';
import "./Botones.css"
import "./LandingPage.css"

export default function PageNotFound () {
    return (
        <div class="notfound">
            <img src="https://elements-video-cover-images-0.imgix.net/files/961bcd50-cb8b-4632-b46c-3abb528c984d/inline_image_preview.jpg?auto=compress%2Cformat&fit=min&h=394&w=700&s=93c72c1aa4b82afae60d8ffa2a8dd7e1" alt="" height='502p' width='894p'/>
            <Link to = '/home'>
                <button class= "buttonOver" ></button>
            </Link>
            <button class="black"></button>
        </div>
    )
}
