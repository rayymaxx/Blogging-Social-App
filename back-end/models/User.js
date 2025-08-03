import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
    }, { timestamps: true });
    
export default mongoose.model("User", userSchema);

