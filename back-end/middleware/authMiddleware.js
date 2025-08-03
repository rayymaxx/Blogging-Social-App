import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
let token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(401).json({ message: "Not authorized" });

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
} catch (err) {
    res.status(401).json({ message: "Invalid token" });
}
};

const admin = (req, res, next) => {
if (req.user && req.user.isAdmin) {
    next();
} else {
    res.status(401).json({ message: "Not authorized as admin" });
}
};

export { protect, admin };
