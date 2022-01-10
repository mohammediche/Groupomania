import React from 'react';
import {Link} from "react-router-dom";
import "../styles/PageNotFound.css"

const PageNotFound = () => {
    return (
        <div>
            <h1 className='h1-pageNotFound'>ERREUR 404 - Page non trouvée</h1>
            <h2 className='h2-pageNotFound'>L'adresse que vous avez entré n'existe pas... Essayer plutôt avec ceci : 
                <Link to={"/"}> Page d'accueil du site Groupomania</Link>
            </h2>

        </div>
    );
};

export default PageNotFound;