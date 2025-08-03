const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
// @desc    Register new user
exports.register = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists)
        return res.status(400).json({ message: "User already exists" });
  
      // Create new user
      const newUser = new User({ username, email, password, isAdmin });
      await newUser.save();
  
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser),
      });
    } catch (err) {
      res.status(500).json({ message: "Server error during registration" });
    }
  };
  
  // @desc    Login user
  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid email or password" });
  
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } catch (err) {
      res.status(500).json({ message: "Server error during login" });
    }
  };