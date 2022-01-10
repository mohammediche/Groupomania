/*APPELER LA FONCTION DANS UN onSbmit :
onSubmit={()=>{postSubmit()}} */ 
import axios from "axios";
import { useState, useContext } from "react";
import "../styles/CreatePost.css";
import {AuthContext} from "../Helpers/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("");
  const {authState, setAuthState} = useContext(AuthContext)

  const postSubmit = () => {
    // const posts = { title, postText, username };
    axios.post("http://localhost:3001/posts",  
    {
      title: title, 
      postText: postText,
      username: username,
    },        
    {
      headers:{
        accessToken: localStorage.getItem("authToken") //on passe le key de notre localStorage
      }
    })
    .then((res) => {
      if (res.data.error) {
        alert("Erreur, Vous devez etre connecté pour pouvoir publié !");
        console.log("Erreur, Vous devez etre connecté pour pouvoir publié !");
        
      } else {
        console.log("Post added !");
      }
    })
    .catch(Error => {console.log("erreur lors de la création du post"+Error);})
  };

  return (
    <div>
    { authState.status ?
      (<>
    <div className="formulaire-post">
      <form id="form" onSubmit={postSubmit}>
        <input autoFocus className="sous-form input-title" placeholder="Votre titre..." required onChange={(e) => { setTitle(e.target.value);}}id="espace-title"type="text"value={title}/>
         
        <textarea className="sous-form textarea" placeholder="Quoi de neuf?" required onChange={(e) => {setPostText(e.target.value);}}type="text"value={postText}/>

        <input className="sous-form input-username" placeholder="Username" required onChange={(e) => { setUsername(e.target.value); }}type="text"value={username}/>
        <div className="div-button-publier">
        <button>Publier </button>
        </div>
      </form>
    </div>
    </>) : null}
    </div>
  );
};

export default CreatePost;

