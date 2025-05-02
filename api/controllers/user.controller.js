import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup
export const signup = async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    console.log(err.message);
  }
};

// Login
export const login = async (req, res,next) => {
  const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json({ message: "Email and password are required" });
  // }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Post additional info (if needed)
export const postUserInfo = async (req, res) => {
  const {email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { email}, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// Get current user info
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Check project limit
export const checkProjectLimit = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const limitReached = user.projectCount >= 4;
    res.json({ allowed: !limitReached });
  } catch (err) {
    res.status(500).json({ message: 'Error checking limit', error: err.message });
  }
};

// Get current logged-in user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    
    if (req.userId !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

