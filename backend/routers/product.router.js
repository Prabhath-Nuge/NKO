import express from 'express';
import { addNewProduct, addProductCategory, editvariant, getHomeProductCategories, getProductCategories, getProductVariants } from '../controllers/productcategory.controller.js';

const router = express.Router();

router.post('/category',addProductCategory);
router.get('/category',getProductCategories);
router.get('/homecategory',getHomeProductCategories);
router.post('/addnewproduct',addNewProduct);
router.get('/variants/:id',getProductVariants);
router.post('/editvariant/:id', editvariant);

export default router;