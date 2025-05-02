import express,{Router} from 'express';
import {
    signup,
    login,
    postUserInfo,
    getUserInfo,
    checkProjectLimit,
    getCurrentUser,
    getUserById
  } from '../controllers/user.controller.js';
  import authMiddleware from '../middlewares/authMiddleware.js';

const app = express.Router();

app.post('/login',login)
app.post('/signup',signup)
// userinfo
app.post('/postuserinfo', authMiddleware, postUserInfo); 
app.get('/getuserinfo', authMiddleware, getUserInfo);    
app.get('/project-limit', authMiddleware, checkProjectLimit); 
app.get('/me', authMiddleware, getCurrentUser); 
app.get('/user/:id', authMiddleware, getUserById);
// app.get('/user/:id/projects', authMiddleware, getProjectsByUserId);

export default app;
