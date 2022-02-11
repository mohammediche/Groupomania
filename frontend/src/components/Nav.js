import React, { useContext, useEffect, useState } from 'react';
import { BiArrowToLeft } from 'react-icons/bi';
import { Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../Helpers/AuthContext"
import axios from "axios";
import image from "../images/logo-white.png";

const Nav = () => {
    const {authState, setAuthState} = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const userId = localStorage.getItem("idUser");
    const Navigate = useNavigate();
    

     useEffect(() => { 

        if (localStorage.getItem("username")) {

            setAuthState({status: true});
        } else {
            setAuthState({status: false}); 
        }
  
    }, [])
    

    const logout = ()=>{
        setAuthState({status : false});
        localStorage.clear();
        Navigate("/login");
    }

    // suppression d'un utilisateur
    const deleteUser = ()=>{

        axios.delete(`http://localhost:3001/auth/deleteUser`, {
            headers:{
                accessToken: localStorage.getItem("autorisationToken")
               
               }
        })
        .then((res)=>{  
            setAuthState({status : false}) 
            localStorage.clear();
            Navigate("/signup");     
        })
        .catch(error => console.log("Erreur lors de la suppression du compte..." + error))
    }


    return (
        <header className="header header2">
       { authState.status ? <>
         { window.location.pathname === "/" ? <Link to={"/"}> Accueil </Link> : <Link className="retour-accueil" to={"/"}> < BiArrowToLeft/>  Revenir à l'accueil</Link>}
         </>
      :null}
         <img src={image} alt="logo du site" style={{height: 75 +"px", width: "auto"}}/>
       
        <nav className="nav">
        {authState.status ? 
           (<>
           <img className='menu-profil' onClick={()=> setShow(!show)} src="https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/medias/2015/04/media_126061/call-of-duty-retour-sur-l-histoire-mouvementee-d-une-des-saga-les-plus-populaires-du-jeu-video%2CM217573.jpg?itok=4BONQD39" alt="logo du profil" />
           {/* <button >Supprimer Mon compte</button> */}
           { show &&
           <ul className='ul-nav'>  
               <li><Link to= {`/profil/${userId}`}>Mon compte</Link></li>           
               <li><Link className="logout" to={"/login"} onClick={logout}>Se déconnecter</Link></li>
               <li style={{cursor: "pointer"}} onClick={()=> { if (window.confirm("Attention la suppression du compte est définitive, vous ne pourrez plus vous y connecter, étes-vous sur de vouloir supprimer votre compte?")) return deleteUser() }}>Supprimer mon compte</li>      
           </ul>}
           </>)
           :
          (<>
          <div>
           <Link className="signup" to={"/signup"}>S'inscrire</Link>
           <Link className="login" to={"/login"}>Se connecter</Link>
           </div>
          </>)
        }
         </nav>
     
      </header> 
    );
};

export default Nav;


/*  background: aliceblue;
    padding: 8px 16px;
    line-height: 1.7;
    border-radius: 6px;
    margin-top: 8px;
    
    list-style-type: none;*/