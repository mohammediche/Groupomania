import React, { useState, useContext } from 'react';
import "../styles/Signup.Login.css"
import { FaUserAlt, FaLock } from "react-icons/fa"; //icon
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import {AuthContext} from "../Helpers/AuthContext";
import Nav from "./Nav";
import jwt from 'jwt-decode';

// import logo from"../images/logo-black.png"

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const {authState, setAuthState} = useContext(AuthContext); // use context qui vas utiliser les valeurs de App.js AuthContext.Provider value={(authState, setAuthState)} 
	const Navigate = useNavigate();




	const submitLogin = ()=>{

		const data = {username:username, password: password}

		axios.post("http://localhost:3001/auth/login", data)
		
		.then(res=>{
			// si il y a une erreur parmis ceux qu'on a mis dans le backend, on renvoi une alert erreur.
			if(res.data.error){
				alert("erreur, username ou le mot de passe n'existe pas"); 
			}else{ //sinon, on stock notre token dans notre localStorage
				const tokenDecoded = jwt(res.data);	
				console.log(tokenDecoded);
				// setAuthState({status: true}); // utilisateur connecté !
				Navigate("/");
				console.log("utilisateur connecté !");
				
				localStorage.setItem("autorisationToken", res.data);
				localStorage.setItem("username", data.username);
				localStorage.setItem("Role", tokenDecoded.role);
				localStorage.setItem("idUser", tokenDecoded.id);
				// console.log(res.data); ca nous renvoi un token, c'est pour ca on doit decoder pour avoir la parti payload du token, header payload et signature qui a besoin du secret token pour l'afficher
						
				
				
				
			}		
		})
		.catch(error => console.log(error));
	}
    return (
        <div className="container">
			 <Nav/>
	<div className="screen">
		<div className="screen__content">
            {/* <div><img className='logoGroupomania' src={logo} alt="" /></div> */}
			<form className="login">

            <h1>Se connecter</h1>
				<div className="login__field">
					<FaUserAlt/>
					<input onChange={(e)=>{setUsername(e.target.value)}} required type="text" className="login__input" placeholder="Username"/>
				</div>
				<div className="login__field">
					<FaLock/>
					<input onChange={(e)=>{setPassword(e.target.value)}} required type="password" className="login__input" placeholder="Password"/>
				</div>
				<button type='button' onClick={submitLogin} className="button login__submit" aria-label="se connecter" title="se connecter">Se connecter</button>  	

			</form>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    );
};

export default Login;