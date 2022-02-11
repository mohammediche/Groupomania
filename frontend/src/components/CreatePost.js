
import axios from "axios";
import { useState } from "react";
import "../styles/CreatePost.css";

const CreatePost = (props) => {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

  


  const postSubmit = (e) => {
    e.preventDefault();

     /*********** Post sans image ***********/ 
    //   const posts = { title, postText };
    //  axios.post("http://localhost:3001/posts", posts, {
    //    headers:{
    //      accessToken : localStorage.getItem("autorisationToken")
    //    }

    //  })
    //  .then((res)=>{
    //    const postToAdd = {title : res.data.title, postText: res.data.postText, Likes: [],  id : res.data.id};
    //    props.gerePostAjout(postToAdd);
    //    setTitle("");
    //    setPostText("");
    //  })

    //  .catch((error) => {
    //    console.log(error);
    //  })
 


    /*********** Post avec image ***********/ 
    const formData = new FormData();
    formData.append("title", title)
    formData.append("postText", postText)
    
    if (image) {
      formData.append("image", image)
      
    }
    
    axios.post("http://localhost:3001/posts",formData,       
    {
      headers:{
        accessToken: localStorage.getItem("autorisationToken") //on passe le key de notre localStorage
      }
    })
    .then((res) => {

        // console.log("Post added !", res.data);  // un objet qui contient les données de mon post
          

        const postToAdd = {title : res.data.title, postText: res.data.postText, image: res.data.image, Likes: [],  id : res.data.id};
          props.gerePostAjout(postToAdd) // ramener les données directement avec res.data tester ca
          setTitle("");
          setPostText("");
          setImage("");
           
    })
    .catch(error => console.log(error))
  };






  return (
    <div>
      
    <div className="formulaire-post">
      <form id="form" onSubmit={postSubmit} encType="multipart/form-data">

        <input autoFocus className="sous-form input-title" placeholder="Votre titre..." required onChange={(e) => { setTitle(e.target.value);}}id="espace-title"type="text"value={title}/>        
        <textarea className="sous-form textarea" placeholder="Quoi de neuf?" required onChange={(e) => {setPostText(e.target.value);}}type="text"value={postText}/>

          <label style={{color : "#fff"}} htmlFor="file" className="btn-3">Choisir un fichier</label> 
          <input className="uploadImageInput" type="file" id="file" name="image" onChange={(e)=>{setImage(e.target.files[0]) }}/>

         <div className="div-button-publier">
          <button title="publier le post ?" style={{textAlign : "center" }}>Publier </button>
         </div>
      </form>
    </div>
    
    </div>
  );
};

export default CreatePost;

