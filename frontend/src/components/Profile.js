import React, { useEffect, useState, useContext } from 'react';
import "../styles/Profile.css";
import Nav from './Nav';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import { BiCommentDetail } from "react-icons/bi"; //icon
import moment from "moment";
import "moment/locale/fr";


const Profile = () => {
  const Navigate = useNavigate();
  const {id} = useParams();
  console.log(id);

  const [username, setUsername] = useState("");
  const [PostsOfUser, setPostsOfUser] = useState([]);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [show, setShow] = useState(false);


  useEffect(() => {

    axios.get(`http://localhost:3001/auth/profil/${id}`)
    .then((res)=>{ 
      setUsername(res.data.username); 
    })
    .catch(error => console.log(error))
//
    // pour récuperer tout les posts d'un seul utilisateur
    axios.get(`http://localhost:3001/posts/byUserId/${id}`)
    .then((res)=>{
      setPostsOfUser(res.data);
    })
    .catch(error => console.log(error));

  },
  [])

  const modifyPassword = (e)=>{
    e.preventDefault();
        // modify username & password 
        axios.put("http://localhost:3001/auth/modifyPassword", 
        {
          oldPassword: oldPassword, 
          newPassword: newPassword,
        },
        {
          headers:{
          accessToken : localStorage.getItem("autorisationToken"),
          }
        }
        )
        .then((res)=>{
          if (res.data.error) {
            alert(res.data.error); 
            console.log("erreur lors de la modification du password...");
          }else{
            alert(res.data);
            Navigate("/");
        }
    
        })
        .catch(error => console.log(error));

  } 

   // suppression d'un utilisateur
   const deleteUser = ()=>{

    axios.delete(`http://localhost:3001/auth/deleteUser/${id}`, {
        headers:{
            accessToken: localStorage.getItem("autorisationToken")
           
           }
    })
    .then((res) =>{
        localStorage.clear();
        Navigate("/signup");
    })
    .catch(error => console.log("Erreur lors de la suppression du compte..." + error))
}






    return (
        <div className='container-profil'>
          <div className='header-profilPage'>< Nav/></div>
 <div className="card">
      <div className="img-bx">
        <img src="https://i.postimg.cc/dQ7zWbS5/img-4.jpg" alt="profil" />
      </div>
      <div className="content">
            <div className="detail">
               <h2 className='username-profil'>{username}</h2>
               <p className='bio-profil'>ici la bio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, quidem! Rem repellendus nam quos inventore, minima animi, quibusdam debitis nobis neque accusantium quae sint aliquid soluta id molestias maxime! Natus?</p> 
             </div>

             {localStorage.getItem("username") === username || localStorage.getItem("Role" === true)
               ? 
            <div className='editPassword'>

                <button className='buttonsProfil' onClick={()=>{setShow(!show)}}>Modifier votre mot de passe</button>
                <button onClick={()=> { if (window.confirm("Attention la suppression du compte est définitif, vous ne pourrez plus vous y connecter, étes-vous sur de vouloir supprimer votre compte?")) return deleteUser() }}>Supprimer Mon compte</button>
               
            </div>
            :null} 

           {localStorage.getItem("username")  === username || localStorage.getItem("Role" === true) ? show &&
             <form className='disabled-input'>
                <input required className='usernameExist' type="text" onChange={(e)=> {setoldPassword(e.target.value)}}   placeholder='Votre mot de passe actuel'/> 
                <input required className='passwordExist' type="password" onChange={(e)=> {setnewPassword(e.target.value)}}  placeholder='Votre Nouveau mot de passe...'/>
                <button className='buttonsProfil'  onClick={modifyPassword}>Valider</button>
             </form>
           :null}
      </div>
    </div>

    {PostsOfUser.map((MyPost, key) => {
        return (
          
          <section key={key} className="accueil-content-post postUser">
            <div className="display-flex">
              <span className="display-block">
                <img             
                  alt="profil"
                  className="image-profil"
                  src={
                    "https://static.jobat.be/uploadedImages/grandprofilfb.jpg"
                  }
                />
                <p className="username-post">{MyPost.username}</p>
              </span>
              <p> {moment(MyPost.updatedAt).fromNow()}</p>
            </div>

            <hr />
            <div className="post-text">
              <h2 className="name-profil">{MyPost.title}</h2>
              <p>{MyPost.postText}</p>
            </div>
            {/* buttons like et comments */}
            <div className="like-comments-pen">
              <div className="buttons-like-comments">

                <button
                 className="icon-comments"
                 id="icons"
                 title="Lire ou Ajouter un commentaire..."
                 onClick={()=>{Navigate(`/post/${MyPost.id}`)}}>
                 <BiCommentDetail />
                </button>

              </div>
              
            </div>
          </section>
          
        );
        
      })}
      </div>
    );
};

export default Profile;