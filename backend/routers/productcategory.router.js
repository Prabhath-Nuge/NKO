import express from 'express';
import { addProductCategory, getProductCategories } from '../controllers/productcategory.controller.js';

const router = express.Router();

router.post('/category',addProductCategory);
router.get('/category',getProductCategories);

export default router;