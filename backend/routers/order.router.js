import express from 'express';
import { addToOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/addtoorder', addToOrder)

export default router;