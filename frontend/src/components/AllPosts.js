import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AllPosts.css";
import { BiCommentDetail } from "react-icons/bi"; //icon
// import { AiOutlineLike } from "react-icons/ai"; //icon
import { MdEdit } from "react-icons/md"; //icon
import Likes from "./Likes";


const AllPosts = () => {
  const Navigate = useNavigate();
  
  //setallPost pour mettre a jour mes posts(allPost).
  const [allPost, setallPost] = useState([]);
//pour fetcher la data il faut utiliser useEffect
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setallPost(res.data);
        // console.log(allPost);
        //toute notre data est acctuelement stocké dans la variable allPost
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
   
  // const LikePost = (postId)=>{
  //   axios.post("http://localhost:3001/likes", 
  //   {PostId: postId},
  //   {
  //     headers:{
  //       accessToken : localStorage.getItem("authToken")
  //     }
  //   }
  //   ).then((res, e)=>{
  //     if (res.data.error) {
  //       e.preventDefault();
  //     }
  //     setallPost(
  //       allPost.map((Post)=>{
  //         if (Post.id === postId) {

  //           if (res.data.Liked) {
  //             return {...Post, Likes: [...Post.Likes, 0]}
              
  //           } else {
  //             const likesArray = Post.Likes;
  //             console.log(likesArray);
  //             likesArray.pop(); //supprime le dernier élément du tableau (on garde 0 et on supprime le 1)
  //             return {...Post, Likes: likesArray}
              
  //           }
            
  //         } else {
  //           return Post;
  //         }
  //       })
  //     ) 
  //   })
  //   .catch( (error)=>{alert("Vous devez être connecté pour pouvoir liker...")} );

  // }
 

  return (
    <main className="App">
      {allPost.map((post, key) => {
        return (
          <section key={key} className="accueil-content-post">
            <div className="display-flex">
              <span className="display-block">
                <img
                  className="image-profil"
                  src={
                    "https://static.jobat.be/uploadedImages/grandprofilfb.jpg"
                  }
                />
                <p className="username-profil">{post.username}</p>
              </span>
              <p> 5mn</p>
            </div>

            <hr />
            <div className="post-text">
              <h2 className="name-profil">{post.title}</h2>
              <p>{post.postText}</p>
            </div>
            {/* buttons like et comments */}
            <div className="like-comments-pen">
              <div className="buttons-like-comments">
              <Likes />
                <button
                 className="icons icon-comments"
                 title="Lire ou Ajouter un commentaire..."
                 onClick={()=>{Navigate(`/post/${post.id}`)}}>
                 <BiCommentDetail />
                </button>

              </div>
            
            <div className="editButton">
            <button onClick={()=>{Navigate(`/post/${post.id}`)}}><MdEdit /></button> {/* lien avec l'id à faire */}
            
            </div>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default AllPosts;
