import express from 'express'
import { getManagers, getNewUsers, userLogin, userRegister } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/getnewusers', getNewUsers);
router.get('/getmanagers', getManagers);

export default router;