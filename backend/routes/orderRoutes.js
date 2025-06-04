import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/checkout', protect, createOrder); // Pembelian langsung
router.get('/', protect, getOrders); // Riwayat pembelian

export default router;