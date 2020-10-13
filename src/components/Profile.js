import React,{useEffect,useState} from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service"

const currentUser = AuthService.getCurrentUser();

const Profile  = ()=>{
    const [mypics,setPics] = useState([]) 
    const [image,setImage] = useState("")  
    useEffect(()=>{
       UserService.getMyPost()
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","cnq")
        fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{    
       
           UserService.updatePhoto().then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...currentUser,pic:result.pic}))
              //  dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img alt="profPic" style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={currentUser?currentUser.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{currentUser?currentUser.user.name:"loading"}</h4>
                   <h5>{currentUser?currentUser.user.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{currentUser?currentUser.user.followers.length :"0"} followers</h6>
                       <h6>{currentUser?currentUser.user.following.length:"0"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile
