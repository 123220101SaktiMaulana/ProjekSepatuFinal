import { Router } from 'express';
import { getCurrencyRates, convertCurrency, convertTime, getSensorData } from '../controllers/utilityController.js';

const router = Router();

router.get('/currency/rates', getCurrencyRates);
router.get('/currency/convert', convertCurrency);
router.get('/time/convert', convertTime);
router.get('/sensor', getSensorData); // Endpoint simulasi sensor

export default router;