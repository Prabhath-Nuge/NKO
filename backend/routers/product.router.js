import express from 'express';
import { addNewProduct, addProductCategory, getProductCategories } from '../controllers/productcategory.controller.js';

const router = express.Router();

router.post('/category',addProductCategory);
router.get('/category',getProductCategories);
router.post('/addnewproduct',addNewProduct);

export default router;