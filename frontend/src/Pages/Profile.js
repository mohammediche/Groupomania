import React, { useEffect, useState } from 'react';
import "../styles/Profile.css";
import Nav from '../components/Nav';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import { BiCommentDetail } from "react-icons/bi"; //icon
import moment from "moment";
import "moment/locale/fr";



const Profile = () => {
  const Navigate = useNavigate();
  const {id} = useParams();

  const [username, setUsername] = useState("");
  const [PostsOfUser, setPostsOfUser] = useState([]);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [show, setShow] = useState(false);



  useEffect(() => {

    axios.get(`http://localhost:3001/auth/profil/${id}`) // supprimer ceci et prendre le username depuis localstroage
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

  },[])

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
   const deleteAnyUser = ()=>{
   
    axios.delete(`http://localhost:3001/auth/deleteAnyUser/${id}`, {
        headers:{
            accessToken: localStorage.getItem("autorisationToken")
           }
    })
    .then((res) =>{
      if (localStorage.getItem("Role") === "true") {
        
        
      }
      // utilisateur supprimé
       console.log(res.data.message);
        Navigate("/");
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
      <div className="content" style={{width: "450" +"px"}}>
             <div className="detail">
               <h2 className='username-profil'>{username}</h2>
             </div>

             {localStorage.getItem("username") === username || localStorage.getItem("Role")  === "true"? 

            <div className='editPassword'>
                <button className='buttonsProfil' onClick={()=>{setShow(!show)}}>Modifier votre mot de passe</button>          
            </div>
            :null}   

           {localStorage.getItem("username")  === username || localStorage.getItem("Role") === "true" ? show &&
             <form className='disabled-input'>
                <input required className='usernameExist' type="text" onChange={(e)=> {setoldPassword(e.target.value)}}   placeholder='Votre mot de passe actuel'/> 
                <input required className='passwordExist' type="password" onChange={(e)=> {setnewPassword(e.target.value)}}  placeholder='Votre Nouveau mot de passe...'/>
                <button className='buttonsProfil'  onClick={modifyPassword}>Valider</button>
             </form>
           :null}
            {localStorage.getItem("Role")  === "true"? <button className='admin-deleteCompte' onClick={ deleteAnyUser }>Supprimer ce compte</button>: null }
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
              {MyPost.image &&<img className='imagePost' src={MyPost.image}></img>}
              <h2 className="name-profil">{MyPost.title}</h2>
              <p>{MyPost.postText}</p>
            </div>
            {/* buttons like et comments */}
            <div className="like-comments-pen">
              <div className="buttons-like-comments">

                <button
                 className="icons icon-comments"
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