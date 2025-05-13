import express from 'express';
import { addShop, getAllShops, getShop, getShops,  getShopsByRef,  updateShop } from '../controllers/shop.controller.js';

const router = express.Router();

router.post('/', addShop);
router.get('/', getShops);
router.get('/allshops', getAllShops);
router.get('/viewrefsshops/:id', getShopsByRef);
router.post('/edit/:id', updateShop);
router.get('/:id', getShop);

export default router;