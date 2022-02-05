import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AllPosts.css";
import { BiCommentDetail } from "react-icons/bi"; //icon
import { AiOutlineLike } from "react-icons/ai"; //icon
import { MdEdit } from "react-icons/md"; //icon
import moment from "moment";
import "moment/locale/fr";
import CreatePost from "./CreatePost";

const AllPosts = () => {
  const Navigate = useNavigate();
  
  const [allPost, setallPost] = useState([]);
  const [likedPostsUserConnect, setlikedPostsUserConnect] = useState([]);

  useEffect(() => {
    getAllPosts();
 
  }, []);


  const getAllPosts = ()=>{
    axios
    .get("http://localhost:3001/posts", 
    {
      headers:{
      accessToken: localStorage.getItem("autorisationToken")
      // Authorization : `bearer ${REACT_APP_MYKEY_LOCALSTORAGE}`
     }
    }
  )
    .then((res) => {
      setallPost(res.data.allPost);
      //on map pour prendre uniquement le PostId au lieu du post entier
      setlikedPostsUserConnect(res.data.likedPostsUserConnect.map((like)=>{ 
        return like.PostId; 
      })
      );
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const gerePostAjout = (newPost)=>{
    // setallPost((prev)=>([...prev, newPost]))
    getAllPosts()
    console.log("====>");
    console.log(newPost);
  }
   
  const LikePost = (postId)=>{
    axios.post("http://localhost:3001/likes", 
    {PostId: postId},
    {
      headers:{
        accessToken : localStorage.getItem("autorisationToken")
      }
    }
    ).then((res, e)=>{
      if (res.data.error) {
        e.preventDefault();
      }
      setallPost(
        allPost.map((Post)=>{
          if (Post.id === postId) {

            if (res.data.Liked) {
              return {...Post, Likes: [...Post.Likes,0] }
              
            } else {
              const likesArray = Post.Likes;
              // console.log(likesArray);
              likesArray.pop(); //supprime le dernier élément du tableau (on garde 0 et on supprime le 1)
              return {...Post, Likes: likesArray}
              
            }
        
          } else {
            return Post;
          }
        })
      );

      if (likedPostsUserConnect.includes(postId)) {
        setlikedPostsUserConnect(likedPostsUserConnect.filter((id)=>{
          return id !== postId; //a revoir ce que ca veut dire
        }))
        
      }else{
        //ca permettra de changer la couleur du like sans refresh la page
        setlikedPostsUserConnect([...likedPostsUserConnect, postId]);
      }

    })
    .catch( (error)=>{alert("Vous devez être connecté pour pouvoir liker...")} );

  }
 



  return (
    
    <><CreatePost gerePostAjout= {gerePostAjout}/> {/* on appelle notre fonction de au dessus */}
    <main className="App">
      {allPost.map((MyPost, key) => {
        return (
          <section key={key} className="accueil-content-post">
            <div className="display-flex">
              <Link title="Voir le profil" to={`/profil/${MyPost.UserId}`}>
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
              </Link>
              <p> {moment(MyPost.updatedAt).fromNow()} </p>
            </div>

            <hr />
            <div className="post-text">
              <img className="imagePost" src={MyPost.image} alt="contenu visuel de la publication" />
              <h2 className="name-profil">{MyPost.title}</h2>
              <p>{MyPost.postText}</p>
            </div>
            {/* buttons like et comments */}
            <div className="like-comments-pen">
              <div className="buttons-like-comments">
              {/* <Likes /> */}
             
              {MyPost.Likes.length === 0 ? null : <label>{MyPost.Likes.length}</label>} 
              <button 
              aria-label="like"
                id="icons" 
                onClick={()=> {LikePost(MyPost.id)}} 
                className={
                   likedPostsUserConnect.includes(MyPost.id) ? "icon-like-active" : "icon-like"
                  }> <AiOutlineLike />
              </button>
            
                <button
                 className="icon-comments"
                 aria-label="accéder au post en détail"
                 id="icons"
                 title="accéder au post en détail"
                 onClick={()=>{Navigate(`/post/${MyPost.id}`)}}>
                 <BiCommentDetail />
                </button>

              </div>
            
              <div className="editButton">
                 {localStorage.getItem("username") === MyPost.username || localStorage.getItem("Role" === true) ? <button onClick={()=>{Navigate(`/post/${MyPost.id}`)}} aria-label="accéder au post en détail" title="accéder au post en détail"><MdEdit /></button>: null}   {/* lien avec l'id à faire */}
                 
              </div>
              
            </div>
          </section>
        );
      })}
    </main>
    </>
  );
};

export default AllPosts;


// || authState.role === 1 