import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => 
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with user info & JWT token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Authenticate user (login)
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Check password match (assuming matchPassword method is on User model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Respond with user info & JWT token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};
