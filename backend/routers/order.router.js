import express from 'express';
import { addShopToOrder, addToOrder, deleteOrder, enterPayment, getOngoindOrder, orderFinish, removeShopFromOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/getOngoingOrders/:id', getOngoindOrder);
router.post('/addtoorder', addToOrder);
router.post('/pay', enterPayment);
router.post('/addshop', addShopToOrder);
router.post('/finish', orderFinish);
router.post('/removeshop', removeShopFromOrder);
router.delete('/delete/:id',deleteOrder);


export default router;