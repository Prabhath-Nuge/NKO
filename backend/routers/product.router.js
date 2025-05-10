import express from 'express';
import { addNewProduct, addProductCategory, editProductCategory, editvariant, getHomeProductCategories, getProductCategories, getProductsWithStocks, getProductVariants } from '../controllers/productcategory.controller.js';

const router = express.Router();

router.post('/category',addProductCategory);
router.get('/category',getProductCategories);
router.get('/homecategory',getHomeProductCategories);
router.post('/addnewproduct',addNewProduct);
router.get('/allstocks', getProductsWithStocks);
router.get('/variants/:id',getProductVariants);
router.post('/editvariant/:id', editvariant);
router.post('/categoryedit', editProductCategory);

export default router;