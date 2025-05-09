import express from 'express';
import { getSession } from '../controllers/api.controller.js';

const router = express.Router();

router.get('/session', getSession);

export default router;