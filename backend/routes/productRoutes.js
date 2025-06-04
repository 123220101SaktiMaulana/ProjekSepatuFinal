import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // <--- TAMBAHKAN BARIS INI

export default router;