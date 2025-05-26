import express from 'express';
import { getCurrentSalary, getSalaryHistoryById, updateSalary } from '../controllers/salary.controller.js';

const router = express.Router();

router.get('/getsalary', getCurrentSalary);
router.post('/updatesalary', updateSalary);
router.get('/history/:id', getSalaryHistoryById);

export default router;