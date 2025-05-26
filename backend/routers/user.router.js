import express from 'express'
import { deleteUser, getAdmins, getEmps, getManagers, getNewUsers, getRefs, logout, updateUser, userLogin, userRegister } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/getnewusers', getNewUsers);
router.get('/getmanagers', getManagers);
router.get('/getadmins', getAdmins);
router.get('/getrefs', getRefs);
router.get('/getemps', getEmps);
router.post('/updateuser', updateUser);
router.get('/logout', logout);
router.delete('/deleteuser/:id', deleteUser);

export default router;