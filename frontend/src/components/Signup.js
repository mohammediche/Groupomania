import { useState } from "react";
import "../styles/Signup.Login.css"
import { FaUserAlt, FaLock } from "react-icons/fa"; //icon
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Signup = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const Navigate = useNavigate();
     
 
    const userSubmit = ()=>{

		const data = {username:username, password: password}
		axios.post("http://localhost:3001/auth/signup", data)
		.then(res=>{
			console.log(res.data);
			Navigate("/login")
		})
        
    }
    return (
        <div className="container">
			<Nav/>
	<div className="screen">
		<div className="screen__content">
			<form className="login">
            <h1>S'inscrire</h1>
				<div className="login__field">
                <FaUserAlt/>
					<input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" className="login__input" placeholder="Username" required/>
				</div>
				<div className="login__field">
                <FaLock/>
					<input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className="login__input" placeholder="Password" required/>
				</div>
					<button onClick={userSubmit} type='button' className="button login__submit">S'inscrire</button>         
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

export default Signup;