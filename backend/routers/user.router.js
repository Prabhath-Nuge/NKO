import express from 'express'
import { getAdmins, getManagers, getNewUsers, getRefs, userLogin, userRegister } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/getnewusers', getNewUsers);
router.get('/getmanagers', getManagers);
router.get('/getadmins', getAdmins);
router.get('/getrefs', getRefs);

export default router;