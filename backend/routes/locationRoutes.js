import { Router } from 'express';
import { getNearbyStores } from '../controllers/locationController.js';

const router = Router();

router.get('/stores', getNearbyStores);

export default router;