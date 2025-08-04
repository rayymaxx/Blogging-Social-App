import express from 'express';
import User from '../models/User.js'; // Adjust the path 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sign up user (hash password)
router.post('/signup', async (req, res) => {
try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
    return res.status(400).json({ message: 'User already exists' });

    // The User model's pre-save hook will hash the password
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User signed up successfully' });
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

// Login user (issue JWT token)
router.post('/login', async (req, res) => {
try {
    const { email, password } = req.body;
    if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Issue JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    });

    res.json({ token });
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

// Basic password reset (reset with new password)
router.post('/reset-password', async (req, res) => {
try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
    return res.status(400).json({ message: 'Email and new password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password reset successful' });
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

export default router;
