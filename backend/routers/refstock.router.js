import express from 'express';
import { getRefCurrentStock, getRefPastStockBatchs, updateStock } from '../controllers/refstock.controller.js';

const router = express.Router();

router.get('/getRefCurrentStock/:id', getRefCurrentStock);
router.post('/getRefCurrentStock/:id', updateStock);
router.get('/getrefpaststockbatch/:id', getRefPastStockBatchs);

export default router;