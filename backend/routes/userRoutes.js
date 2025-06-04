import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { updateProfile } from '../controllers/userController.js'; // Anda perlu membuat userController.js

const router = Router();

// Contoh endpoint update profil
// router.put('/:id', protect, updateProfile); // Atau update profil user yang login
router.put('/profile', protect, updateProfile); // Update profil user yang sedang login

export default router;