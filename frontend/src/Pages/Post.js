import Comments from "../components/Comments"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md"; //icon
import Nav from "../components/Nav";
import moment from "moment";
import "moment/locale/fr";
import "../styles/Post.css";


const Post = () => {
    const {postId} = useParams();
    const Navigate = useNavigate();
    const [PostData, setaPostData] = useState([]);
    
    useEffect(() => {

        axios
          .get(`http://localhost:3001/posts/byId/${postId}`)
          .then((res) => {
            setaPostData(res.data);
            
            // console.log(authState);
            // PostData est le contenu de mon Post (title, postText, username)
          });
        }, []);
       
      // supprime Un post
      const deleteOne = ()=>{
        axios.delete(`http://localhost:3001/posts/byId/${postId}`)
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
              alt="photo de profil"
              src={
                "https://static.jobat.be/uploadedImages/grandprofilfb.jpg"
              }
            />
            <p className="username-post">{PostData.username}</p>
          </span>
          </Link>
          <p> {moment(PostData.updatedAt).fromNow()}</p>
        </div>

        <hr />
        <div className="post-text">
        {PostData.image && <img alt="contenu du post" style={{width : 100 + "%"}} src={PostData.image}></img>}
          <h2 className="name-profil">{PostData.title}</h2>
          <p>{PostData.postText}</p>
        </div>
        {/* buttons delete et edit */}
          <div>
              <div className="deleteEditButton">
                { localStorage.getItem("username") === PostData.username || localStorage.getItem("Role")  === "true" ? <button aria-label="supprimer le post" onClick={()=>{ if (window.confirm('??tes-vous s??r de vouloir supprimer votre post ?')) return deleteOne() } } > <MdDelete/> </button> :null}
                { localStorage.getItem("username") === PostData.username && <button onClick={()=>{Navigate(`/edit-post/${PostData.id}`)}} aria-label="modifi?? le contenu du post ?" title="modifi?? le contenu du post ?"> <MdEdit/> </button> }
                
              </div>           
          </div>
        </div>  
          <Comments/>
      </section>
        
    );
};

export default Post;