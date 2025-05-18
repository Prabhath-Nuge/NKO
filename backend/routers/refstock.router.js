import express from 'express';
import { getRefCurrentStock } from '../controllers/refstock.controller.js';

const router = express.Router();

router.get('/getRefCurrentStock/:id', getRefCurrentStock);

export default router;