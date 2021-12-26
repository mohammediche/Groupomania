/*APPELER LA FONCTION DANS UN onSbmit :
onSubmit={()=>{postSubmit()}} */ 
import axios from "axios";
import { useState } from "react";
import "../styles/CreatePost.css"

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("");

  const postSubmit = () => {
    const posts = { title, postText, username };
    axios.post("http://localhost:3001/posts", posts)
    .then((res) => {console.log(posts);})
    .catch(Error => {console.log(Error);})
  };

  return (
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
  );
};

export default CreatePost;

