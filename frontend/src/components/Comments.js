import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiSend } from "react-icons/fi"; //icon
import "../styles/Post.css"; //css
import {AuthContext} from "../Helpers/AuthContext"


const Comments = () => {
    const {id} = useParams();
    const [Comments, setComments] = useState([]); // pour afficher les comments
    const [sendComment, setSendComment] = useState(""); //ajout d'un comm
    const {authState} = useContext(AuthContext);

    useEffect(() => {        
          //récupération des commentaires du post id spécifié
          axios
          .get(`http://localhost:3001/comments/${id}`)
          .then((res) => {setComments (res.data); });

      }, []);

       // add new comment
      const addComment = ()=>{ 
        axios.post("http://localhost:3001/comments", 
        {
          commentBody: sendComment, 
          PostId: id,
        }, 
        {
          headers:{
            accessToken: localStorage.getItem("authToken") //on passe le key de notre localStorage
          }
        }
        )
        .then((res)=>{

          if(res.data.error) { // si y a une erreur dans le backend
            console.log("erreur, l'utilisateur n'est pas authentifié");
            alert("erreur, Veuillez vous connecter pour pouvoir écrire un commentaire...");
          } else {
          console.log("comment added !");
          //Pour plus avoir besoin d'actualiser la page pour voir le commentaire ajouté !
          const commentToAdd = {commentBody : sendComment, username : res.data.username, id: res.data.PostId }; //username se trouve déja dans la BDD. Voir backend Auth et controllerComments.
          console.log(res.data);
          setComments([...Comments, commentToAdd]);
          setSendComment("");
        }
        })
      }
      // Delete comment
      const deleteComment = (id) =>{
        axios.delete(`http://localhost:3001/comments/${id}`, {
          headers:{
            accessToken : localStorage.getItem("authToken")
          }
        })
        .then(()=>{ 
          setComments(Comments.filter((comment)=>{ //pour supprimer le commentaire sans refresh la page.
            return comment.id != id; 
          }))
        })
        .catch(error => console.log("erreur lors de la requete deleteComment"+ error));
        
      }


    return (
        <div className='commentaires'>
        <article>
               <div className="div-add-comment">
                  <img className="image-profil-comment" src={"https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/medias/2015/04/media_126061/call-of-duty-retour-sur-l-histoire-mouvementee-d-une-des-saga-les-plus-populaires-du-jeu-video%2CM217573.jpg?itok=4BONQD39"}/>
                  <input className="input-add-comment"
                    onChange={(e)=>{setSendComment(e.target.value)}} 
                    type="text" placeholder="Ajouter votre commentaire..." 
                    value={sendComment}/>
                  <button className="send-comment" onClick={addComment} type="submit"><FiSend/></button>
               </div>

            {/* On affiche les commentaires */}
               <div className="list-of-comments"> 
               {Comments.map((comment, key)=>{
                 return (
                 <div key={key} className="All-comments">

                   <div className="display-username-buttonDelete">
                     <strong>{comment.username } :</strong>
                     {/* si le username de l'utilisateur connecté est égale à celui de l'utilisateur du commentaire */}
                     {authState.username === comment.username && <button className="delete-comment" onClick={()=> {deleteComment(comment.id)} }>Supprimer</button>}
                     {/* {console.log(authState)} */}
                   </div>
                    <p> {comment.commentBody}</p>
                    
                 </div>
                 )
               })}
                 </div>                                                                
            </article>
        </div>
    );
};

export default Comments;