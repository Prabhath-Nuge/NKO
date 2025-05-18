import express from 'express';
import { getRefCurrentStock, updateStock } from '../controllers/refstock.controller.js';

const router = express.Router();

router.get('/getRefCurrentStock/:id', getRefCurrentStock);
router.post('/getRefCurrentStock/:id', updateStock);

export default router;