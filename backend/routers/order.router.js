import express from 'express';
import { addShopToOrder, addToOrder, deleteOrder, deleteProductFromOrder, enterPayment, getBatchOrderList, getOngoindOrder, getSavedOrderBatches, orderFinish, refGetDoneOrders, removeShopFromOrder, saveBatch } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/getOngoingOrders/:id', getOngoindOrder);
router.get('/refgetdoneorders/:id', refGetDoneOrders);
router.get('/batches/:id', getSavedOrderBatches);
router.get('/batchorderlist/:id', getBatchOrderList);
router.delete('/deleteorderproduct', deleteProductFromOrder);
router.post('/saveBatch', saveBatch);
router.post('/addtoorder', addToOrder);
router.post('/pay', enterPayment);
router.post('/addshop', addShopToOrder);
router.post('/finish', orderFinish);
router.post('/removeshop', removeShopFromOrder);
router.delete('/delete/:id',deleteOrder);


export default router;