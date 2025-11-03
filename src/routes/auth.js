import express from 'express';
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

router.get('/test', authMiddleware, async(req, res) => {
    res.status(200).json({ msg: "Welcome you have been authorized", user: req.user });
});


export default router;
