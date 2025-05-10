import express from 'express';
import { changeStock, getStockHistory } from '../controllers/stock.controller.js';

const router = express.Router();

router.post('/change', changeStock);
router.get('/history', getStockHistory);

export default router;