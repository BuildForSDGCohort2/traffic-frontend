import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://traffic-check.herokuapp.com/";

const getAllPosts = () => {
  return axios.get(API_URL + "allpost", { headers: authHeader() });
};

const getSubPost = () => {
  return axios.get(API_URL + "getsubpost", { headers: authHeader() });
};

const createPost = () => {
  return axios.post(API_URL + "createpost", { headers: authHeader() });
};

const getMyPost = () => {
  return axios.get(API_URL + "mypost", { headers: authHeader() });
};

const likePost = () => {
  return axios.put(API_URL + "like", { headers: authHeader() });
};
const UnlikePost = () => {
  return axios.put(API_URL + "unlike", { headers: authHeader() });
};
const commentPost = () => {
  return axios.put(API_URL + "comment", { headers: authHeader() });
};
const deletePost = () => {
  return axios.delete(API_URL + "deletepost/:postId", {
    headers: authHeader(),
  });
};
const getOneUser = () => {
  return axios.get(API_URL + "user/:id", { headers: authHeader() });
};
const followUser = () => {
  return axios.put(API_URL + "follow", { headers: authHeader() });
};
const UnFollowUser = () => {
  return axios.put(API_URL + "unfollow", { headers: authHeader() });
};
const updatePhoto = () => {
  return axios.put(API_URL + "updatepic", { headers: authHeader() });
};
const searchUsers = () => {
  return axios.post(API_URL + "search-users", { headers: authHeader() });
};
const resetPassword = () => {
  return axios.post(API_URL + "reset-password", { headers: authHeader() });
};
const newPassword = () => {
  return axios.post(API_URL + "new-password", { headers: authHeader() });
};

// const myfollowingpost = () =>{
//   return axios.get(API_URL + "myfollowingpost", {headers: authHeader()})
// }

export default {
  getAllPosts,
  getSubPost,
  createPost,
  getMyPost,
  likePost,
  UnlikePost,
  commentPost,
  deletePost,
  getOneUser,
  followUser,
  UnFollowUser,
  updatePhoto,
  searchUsers,
  resetPassword,
  newPassword,
};
