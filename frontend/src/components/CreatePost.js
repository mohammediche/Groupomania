
import axios from "axios";
import { useState, useContext } from "react";
import "../styles/CreatePost.css";
import {AuthContext} from "../Helpers/AuthContext"; 
import { FiUpload } from "react-icons/fi"; //icon

const CreatePost = (props) => {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const {authState} = useContext(AuthContext);

  


  const postSubmit = (e) => {
    e.preventDefault();
 

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

        console.log("Post added !", res.data);  
        console.log(formData);
          

        const postToAdd = {title : res.data.title, postText: res.data.postText, image: res.data.image, Likes: [],  id : res.data.id};
          props.gerePostAjout(postToAdd) // ramener les données directement avec res.data tester ca
          setTitle("");
          setPostText("");
          setImage("");
           
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
        {/* <input type="file" name="image" onChange={(e)=>{setImage(e.target.files[0]) }}/> */}
        <input className="uploadImageInput" type="file" id="file" name="image" onChange={(e)=>{setImage(e.target.files[0]) }}/>
          <label htmlFor="file" className="btn-3">
          <span><FiUpload /></span>
          </label>

         <div className="div-button-publier">
          <button title="publier le post ?" style={{textAlign : "center" }}>Publier </button>
         </div>
      </form>
    </div>
    </>) : null}
    </div>
  );
};

export default CreatePost;

