import React, { useState, useEffect,useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import M from 'materialize-css'
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service"

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost"
import UserProfile  from "./components/UserProfile"
import Reset from "./components/Reset"
import SubscribedUserPosts  from "./components/SubscribesUserPosts"

const App = () => {
  const  searchModal = useRef(null)
  const [currentUser, setCurrentUser] = useState(undefined);
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])

  useEffect(()=>{
    M.Modal.init(searchModal.current)
},[])

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const fetchUsers = (query)=>{
    setSearch(query)
    UserService.searchUsers().then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
 }

  const renderList= ()=>{
    if (currentUser){
      return [
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/create">Create Post</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <li  key="5">
         <button className="btn #c62828 red darken-3" onClick={logOut}>
            Logout
        </button>
        </li>   
        
       ]
   }else{
     return [
      <li  key="6"><Link to="/login">Signin</Link></li>,
      <li  key="7"><Link to="/register">Signup</Link></li>
     
     ]
    }
  }

  return (
    <div>
      <nav>
        
        <div className="nav-wrapper white">
        <Link to={currentUser ? "/": "/login"} className="brand-logo left">Traffic Check App</Link>
          <ul id="nav-mobile" className="right">
          {renderList()}
          </ul> 
        </div>

        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== currentUser._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>

      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/create" component={CreatePost} />
          <Route exact path="/profile/:id" component={UserProfile}/>
          <Route exact path="/reset-password" component={Reset}/>
          <Route exact path="/myfollowingpost" component={SubscribedUserPosts } />
        </Switch>
      </div>
    </div>
  );
};

export default App;
