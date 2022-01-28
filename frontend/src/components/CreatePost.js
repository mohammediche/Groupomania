
import axios from "axios";
import { useState, useContext } from "react";
import "../styles/CreatePost.css";
import {AuthContext} from "../Helpers/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const {authState} = useContext(AuthContext);
  const [image, setImage] = useState("");

  const postSubmit = () => {

    // const posts = { title, postText };
    const formData = new FormData();
    formData.append("image", image)
    formData.append("title", title)
    formData.append("postText", postText)
    
    axios.post("http://localhost:3001/posts",formData,       
    {
      headers:{
        accessToken: localStorage.getItem("autorisationToken") //on passe le key de notre localStorage
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
      <form id="form" onSubmit={postSubmit} encType="multipart/form-data">

        <input autoFocus className="sous-form input-title" placeholder="Votre titre..." required onChange={(e) => { setTitle(e.target.value);}}id="espace-title"type="text"value={title}/>        
        <textarea className="sous-form textarea" placeholder="Quoi de neuf?" required onChange={(e) => {setPostText(e.target.value);}}type="text"value={postText}/>
        <input type="file" name="image" onChange={(e)=>{setImage(e.target.files[0]) }}/>

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

