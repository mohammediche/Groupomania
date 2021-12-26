import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiSend } from "react-icons/fi"; //icon
import "../styles/Post.css";

/*******************!! IMPORTANT !!********************/
// const [Show, setShow] = useState(true) // onClick show and hide les commentaires
// a mettre dans le but comment :  onClick={()=>setShow(!Show)}
// {Show? :null}

const Comments = () => {
    const {id} = useParams()
    const [Comments, setComments] = useState([]) // pour afficher les comments
    const [sendComment, setSendComment] = useState("") //ajout d'un comm

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
            accessToken: localStorage.getItem("this is my key for Token") //on passe le key de notre localStorage
          }
        }
        )
        .then((res)=>{

          if(res.data.error) { // si y a une erreur dans le backend
            console.log("erreur, l'utilisateur n'est pas authentifié");
            alert("erreur, l'utilisateur n'est pas authentifié");
          } else {
          console.log("comment added !");
          //Pour plus avoir besoin d'actualiser la page pour voir le commentaire ajouté !
          const commentToAdd = {commentBody : sendComment };
          setComments([...Comments, commentToAdd]);
          setSendComment("");
        }
        })
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
                 return <div key={key} className="All-comments">{comment.commentBody}</div>
               })}
                 </div>                                                                
            </article>
        </div>
    );
};

export default Comments;