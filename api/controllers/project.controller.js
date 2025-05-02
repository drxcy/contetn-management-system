// controllers/project.controller.js

import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// Create a project
export const createProject = async (req, res) => {
  const { title } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.projectCount >= 4) {
      return res.status(403).json({ message: 'Project limit reached' });
    }

    const newProject = await Project.create({
      user: req.user.id,
      title,
      tasks: []
    });

    user.projectCount += 1;
    await user.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

// Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  const { title } = req.body;
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId, user: req.user.id },
      { title },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      user: req.user.id
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await User.findByIdAndUpdate(req.user.id, { $inc: { projectCount: -1 } });

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};

// Add a task
export const addTaskToProject = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = {
      title,
      description,
      status: status || 'Pending',
      createdAt: new Date(),
      completedAt: null
    };

    project.tasks.push(task);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error adding task', error: err.message });
  }
};

// Get all tasks in a project
export const getAllTasksInProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project.tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error getting tasks', error: err.message });
  }
};

// Update a task
export const updateTaskInProject = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) {
      task.status = status;
      if (status === 'Completed') {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// Delete a task
export const deleteTaskInProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.remove();
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};
