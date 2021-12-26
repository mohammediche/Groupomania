import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AllPosts.css";
import { BiCommentDetail } from "react-icons/bi"; //icon
import { AiOutlineLike } from "react-icons/ai"; //icon
import { MdEdit } from "react-icons/md"; //icon

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
  return (
    <main className="App">
      {allPost.map((post) => {
        return (
          <section className="accueil-content-post">
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
                <button className="icons icon-like"><AiOutlineLike /></button>
                <button
                 className="icons icon-comments"
                 title="Lire ou Ajouter un commentaire...">
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
