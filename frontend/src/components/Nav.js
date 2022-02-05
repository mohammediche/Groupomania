import React, { useContext, useEffect } from 'react';
import { BiArrowToLeft } from 'react-icons/bi';
import { Link, Navigate, useParams} from 'react-router-dom';
import {AuthContext} from "../Helpers/AuthContext"
import image from "../images/logo-white.png";
// import axios from "axios";

const Nav = () => {
    const {authState, setAuthState} = useContext(AuthContext);
    // const {userId} = useParams();
 

     useEffect(() => { 

        if (localStorage.getItem("username")) {

            setAuthState({status: true});
        } else {
            setAuthState({status: false}); 
        }
  
    }, [])
    

    const logout = ()=>{
        localStorage.clear();
        Navigate("/login");
    }

    // suppression d'un utilisateur
    // const deleteUser = ()=>{

    //     axios.delete(`http://localhost:3001/auth/deleteUser/${userId}`, {
    //         headers:{
    //             accessToken: localStorage.getItem("autorisationToken")
               
    //            }
    //     })
    //     .then((res) =>{
    //         localStorage.clear();
    //         Navigate("/signup");
    //     })
    //     .catch(error => console.log("Erreur lors de la suppression du compte..." + error))
    // }


    return (
        <header className="header header2">
            {/* <img src={image} alt="logo du site" style={{height: 120 +"px"}}/> */}
    
         { window.location.pathname === "/" ? <Link to={"/"}> Accueil </Link> : <Link className="retour-accueil" to={"/"}>< BiArrowToLeft/>  Revenir à l'accueil</Link>}
        
        <nav className="nav">
        {authState.status ? 
           (<>
           <Link className="logout" to={"/login"} onClick={logout}>Se déconnecter</Link>
           {/* <button onClick={()=> { if (window.confirm("Attention la suppression du compte est définitif, vous ne pourrez plus vous y connecter, étes-vous sur de vouloir supprimer votre compte?")) return deleteUser() }}>Supprimer Mon compte</button> */}
           </>)
           :
          (<>
           <Link className="signup" to={"/signup"}>S'inscrire</Link>
           <Link className="login" to={"/login"}>Se connecter</Link>
          </>)
        }
         </nav>
     
      </header> 
    );
};

export default Nav;