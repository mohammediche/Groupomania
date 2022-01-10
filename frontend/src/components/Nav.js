import React, { useContext, useEffect } from 'react';
import { BiArrowToLeft } from 'react-icons/bi';
import { Link, Navigate } from 'react-router-dom';
import {AuthContext} from "../Helpers/AuthContext"
import axios from "axios";

const Nav = () => {
    const {authState, setAuthState} = useContext(AuthContext)

    useEffect(() => {
        
        axios.get("http://localhost:3001/auth/verification", {
            headers:{
                accessToken: localStorage.getItem("authToken")
            }
        }).then((res)=>{
            if (res.data.error) {
                setAuthState({status : false}); 
            }else{
                let username= localStorage.getItem("username");
                console.log("username: ", username)
                setAuthState({status : true, username: username});
            }
        })
        .catch()
  
    }, [])
    

    const logout = ()=>{
        localStorage.removeItem("authToken");
        // setAuthState({status : false});
        Navigate("/login");
    }
    return (
        <header className="header">
        <Link className="retour-accueil" to={"/"}>< BiArrowToLeft/>Revenir à l'accueil</Link>
        
        <nav className="nav">
        {authState.status ? 
           (<>
           <Link className="logout" to={"/login"} onClick={logout}>Se déconnecter</Link>
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