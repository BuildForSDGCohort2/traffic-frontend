import React, { useState, useEffect } from "react";
import { Link} from 'react-router-dom'

import UserService from "../services/user.service";
import AuthService from '../services/auth.service'

const Home = () => {
  const [content, setContent] = useState([]);
  const currentUser = AuthService.getCurrentUser()

  // useEffect(() => {
  //   UserService.getAllPosts().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.posts) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  useEffect(()=>{
    UserService.getAllPosts().then(res=>res.json())
    .then(result=>{
        console.log(result)
        setContent(result.foundPosts)
    })
 },[])

  return (
    <div className="container">
      {
        content.map(item=>{
          return(
            <div className="card home-card" key={item._id}>
              <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== currentUser._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> 
              {item.postedBy._id === currentUser._id && <i className="material-icons" style={{ float:"right" }} onClick={()=>UserService.deletePost(item._id)}>delete</i> }
              </h5>              
              <div className="card-image"> 
                <img alt="somephoto" src={item.photo}/>
              </div>
              <div className="card-content"> <i className="material-icons" style={{color:"red"}}>favorite</i>
                    {item.likes.includes(currentUser._id) ? <i className="material-icons" onClick={()=>{UserService.UnlikePost(item._id)}}>thumb_down</i> : 
                    <i className="material-icons" onClick={()=>{UserService.likePost(item._id)}}>thumb_up</i>}                
                           
                  <h6>{item.likes.length} likes</h6> <h6>{item.title}</h6>
                  <p>{item.body}</p>{item.comments.map(record=>{return(<h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>)})
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    UserService.commentPost(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
          
       </div>
   )
}


export default Home
