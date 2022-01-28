import Comments from "./Comments"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md"; //icon
import Nav from "./Nav";
import "../styles/Post.css";
import {AuthContext} from "../Helpers/AuthContext";


const Post = () => {
    const {id} = useParams();
    const Navigate = useNavigate();
    const [PostData, setaPostData] = useState([]);
    const {authState} = useContext(AuthContext);
    
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
        <Link title="Voir le profil" to={`/profil/${PostData.UserId}`}>
          <span className="display-block">
            <img
              className="image-profil"
              src={
                "https://static.jobat.be/uploadedImages/grandprofilfb.jpg"
              }
            />
            <p className="username-post">{PostData.username}</p>
          </span>
          </Link>
          <p> 5mn</p>
        </div>

        <hr />
        <div className="post-text">
          <h2 className="name-profil">{PostData.title}</h2>
          <p>{PostData.postText}</p>
        </div>
        {/* buttons like et comments */}
          <div>
              <div className="deleteEditButton">
                { authState.username === PostData.username || authState.role === true ? <button onClick={()=>{ if (window.confirm('êtes-vous sûr de vouloir supprimer votre post ?')) return deleteOne() } } > <MdDelete/> </button> :null}
                { authState.username === PostData.username && <button onClick={()=>{Navigate(`/edit-post/${PostData.id}`)}} > <MdEdit/> </button> }
                
              </div>           
          </div>
        </div>  
          <Comments/>
      </section>
        
    );
};

export default Post;