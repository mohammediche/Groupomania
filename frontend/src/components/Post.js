import Comments from "./Comments"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai"; //icon
import { MdDelete, MdEdit } from "react-icons/md"; //icon
import Nav from "./Nav";
import "../styles/Post.css";
import {AuthContext} from "../Helpers/AuthContext";
import Likes from "./Likes";


const Post = () => {
    const {id} = useParams();
    const Navigate = useNavigate();
    const [PostData, setaPostData] = useState([]);
    const {authState, setAuthState} = useContext(AuthContext)
    useEffect(() => {
        axios
          .get(`http://localhost:3001/posts/byId/${id}`)
          .then((res) => {
            setaPostData(res.data);
            // console.log(authState);
            // PostData est le contenu de mon Post (title, postText, username)
          });
        }, []);
       
      // supprime Un post
      const deleteOne = ()=>{
        axios.delete(`http://localhost:3001/posts/byId/${id}`)
        .then((res)=>{
          Navigate("/")
        })
        .catch(error =>(error))
      }

    return (
      <section className="content-post"> 
      <Nav/>
      <div className="left-post">        
        <div className="display-flex">
          <span className="display-block">
            <img
              className="image-profil"
              src={
                "https://static.jobat.be/uploadedImages/grandprofilfb.jpg"
              }
            />
            <p className="username-profil">{PostData.username}</p>
          </span>
          <p> 5mn</p>
        </div>

        <hr />
        <div className="post-text">
          <h2 className="name-profil">{PostData.title}</h2>
          <p>{PostData.postText}</p>
        </div>
        {/* buttons like et comments */}
          <div className="like-comments-pen">
              <div className="buttons-like-comments">
                  {/* <button className="icons icon-like"><AiOutlineLike /></button> */}
                  <Likes allPost={PostData} />      
             </div>
  
              {authState.status ?
              <div className="deleteEditButton">
                <button onClick={()=>{deleteOne()}} > <MdDelete/> </button> {/* lien avec l'id à faire */}
                <button onClick={()=>{Navigate(`/edit-post/${PostData.id}`)}} > <MdEdit/> </button> 
              </div> : null}
             
          </div>
        </div>  
          <Comments/>
      </section>
        
    );
};

export default Post;