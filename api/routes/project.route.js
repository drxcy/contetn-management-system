import express from 'express'
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addTaskToProject,
    updateTaskInProject,
    deleteTaskInProject,
    getAllTasksInProject
  } from '../controllers/project.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
  
const app = express.Router(); 
 
app.post('/projects', authMiddleware, createProject);
app.get('/projects', authMiddleware, getAllProjects);
app.get('/projects/:projectId', authMiddleware, getProjectById);
app.put('/projects/:projectId', authMiddleware, updateProject);
app.delete('/projects/:projectId', authMiddleware, deleteProject);
// task to added
app.post('/projects/:projectId/tasks', authMiddleware, addTaskToProject);
app.get('/projects/:projectId/tasks', authMiddleware, getAllTasksInProject);
app.put('/projects/:projectId/tasks/:taskId', authMiddleware, updateTaskInProject);
app.delete('/projects/:projectId/tasks/:taskId', authMiddleware, deleteTaskInProject);

export default app; 