import express from 'express';
import { addShop, getShop, getShops, updateShop } from '../controllers/shop.controller.js';

const router = express.Router();

router.post('/', addShop);
router.get('/', getShops);
router.get('/:id', getShop);
router.post('/edit/:id', updateShop);

export default router;