import { useState } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai"; //icon

const Likes = () => {
    const [allPost, setallPost] = useState([]);



    const LikePost = ({postId})=>{
        axios.post("http://localhost:3001/likes", 
        {PostId: postId},
        {
          headers:{
            accessToken : localStorage.getItem("authToken")
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
                  return {...Post, Likes: [...Post.Likes, 0]}               
                } else {
                  const likesArray = Post.Likes;
                  console.log(likesArray);
                  likesArray.pop(); //supprime le dernier élément du tableau (on garde 0 et on supprime le 1)
                  return {...Post, Likes: likesArray}
                  
                }
                
              } else {
                return Post;
              }
            })
          ) 
        })
        .catch( (error)=>{alert("Vous devez être connecté pour pouvoir liker...")} );
    
      }
     
    return (
        <div>
            {allPost.map((post, key) => {
            {/* //   {post.Likes.length === 0 ? null : <label>{post.Likes.length}</label>} */}
              <button className="icons icon-like" onClick={()=> {LikePost(post.id)}}><AiOutlineLike /></button>
                
             })
            }

        </div>
    );
}
;
export default Likes;



