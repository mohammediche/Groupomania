import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import "../styles/CreatePost.css"
import Nav from "./Nav";


const EditPost = () => {
    const Navigate = useNavigate();
    const {postId} = useParams();
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {

      if (localStorage.getItem("username") === username) {
        Navigate("/");
        
      } else {
  
        axios.get(`http://localhost:3001/posts/byId/${postId}`)
        .then(res =>{
            // console.log(res.data);
            setTitle(res.data.title) // data du backend
            setPostText(res.data.postText)// data du backend
            setImage(res.data.image);
           
            
  
           
        })
      }
    }, [])
    
    const modifPost = (e) => {       
      e.preventDefault();
      const formData = new FormData();
    formData.append("image", image)
    formData.append("title", title)
    formData.append("postText", postText)
   
      // const posts = { title, postText };
      axios.put(`http://localhost:3001/posts/byId/${postId}`, formData, {
        headers:{
          accessToken: localStorage.getItem("autorisationToken") //on passe le key de notre localStorage
        }
      }).then((res) => {
        console.log("Post modifié avec succés !");
        console.log(res.data);
        Navigate("/")
      });
      
    };

    return (
    <div className="formulaire-post">
       <Nav/>
      <form id="form" onSubmit={modifPost}>

        <input  className="sous-form input-title" placeholder="Votre titre..." required autoFocus onChange={(e) => { setTitle(e.target.value);}}id="espace-title"type="text"value={title}/>
        <textarea className="sous-form textarea" placeholder="Quoi de neuf?" required onChange={(e) => {setPostText(e.target.value);}}type="text"value={postText}/>
        <input type="file" name="image" required onChange={(e)=>{ setImage(e.target.files[0])  }} />

        <div className="div-button-publier">
        <button title="publier le post ?">Publier </button>
        </div>

      </form>
    </div>
    
    );
};

export default EditPost;