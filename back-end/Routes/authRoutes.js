/ routes/authRoutes.js
import express from 'express';
const router = express.Router();

router.post('/register', (req, res) => {
res.send('Register route hit');
});

router.post('/login', (req, res) => {
res.send('Login route hit');
});

export default router;