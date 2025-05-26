import express from 'express';
import { getRefCurrentStock, getRefPastStockBatchs, getRefStockHistoryByBatch, reStock, updateStock } from '../controllers/refstock.controller.js';

const router = express.Router();

router.get('/getRefCurrentStock/:id', getRefCurrentStock);
router.post('/getRefCurrentStock/:id', updateStock);
router.get('/getrefpaststockbatch/:id', getRefPastStockBatchs);
router.get('/getRefStockHistoryByBatch/:id', getRefStockHistoryByBatch);
router.get('/restock/:id', reStock);

export default router;