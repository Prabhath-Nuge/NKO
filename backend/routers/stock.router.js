import express from 'express';
import { changeStock } from '../controllers/stock.controller.js';

const router = express.Router();

router.post('/change', changeStock);

export default router;