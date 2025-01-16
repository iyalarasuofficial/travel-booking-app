import express from 'express';
import verifyAuth from '../middleware/verifyAuth.js';

import { registerUser,getUserById,updateUser,deleteUser } from '../controller/userController.js';
const router = express.Router();
router.post('/',registerUser);
router.get('/', verifyAuth,getUserById);

// Update user by ID
router.put('/:id',verifyAuth, updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);


export default router;

