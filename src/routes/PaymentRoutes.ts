import express from 'express';
import { processPayment, verifyPayment } from '../controllers/PaymentController';

const router = express.Router();

router.post('/process', processPayment);
router.post('/notify', verifyPayment);

export default router;