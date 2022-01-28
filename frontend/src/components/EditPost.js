import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import "../styles/CreatePost.css"
import Nav from "./Nav";
import {AuthContext} from "../Helpers/AuthContext";


const EditPost = () => {
    const Navigate = useNavigate();
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [username, setUsername] = useState("");
    const {authState} = useContext(AuthContext);

    useEffect(() => {

      if (authState.username === username) {
        Navigate("/");
        
      } else {
  
        axios.get(`http://localhost:3001/posts/byId/${id}`)
        .then(res =>{
            console.log(res.data);
            setTitle(res.data.title) // data du backend
            setPostText(res.data.postText)// data du backend
        })
      }
    }, [])
    
    const modifPost = () => {
        
      // e.preventDefault();
      const posts = { title, postText };
      axios.put(`http://localhost:3001/posts/byId/${id}`, posts).then((res) => {
        console.log(posts);
      });
      setTitle("") // une fois on met à jour, on  Remet les champs vide
      setPostText("") // Remettre les champs vide
      Navigate("/")
    };

    return (
    <div className="formulaire-post">
       <Nav/>
      <form id="form" onSubmit={modifPost}>

        <input autoFocus className="sous-form input-title" placeholder="Votre titre..." required onChange={(e) => { setTitle(e.target.value);}}id="espace-title"type="text"value={title}/>
        <textarea className="sous-form textarea" placeholder="Quoi de neuf?" required onChange={(e) => {setPostText(e.target.value);}}type="text"value={postText}/>

        <div className="div-button-publier">
        <button>Publier </button>
        </div>

      </form>
    </div>
    
    );
};

export default EditPost;