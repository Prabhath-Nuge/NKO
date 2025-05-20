import express from 'express';
import { addShopToOrder, addToOrder, getOngoindOrder, removeShopFromOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/getOngoingOrders/:id', getOngoindOrder);
router.post('/addtoorder', addToOrder);
router.post('/addshop', addShopToOrder);
router.post('/removeshop', removeShopFromOrder);


export default router;