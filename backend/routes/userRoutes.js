import express from 'express';

import { registerUser,getUserById,updateUser,deleteUser } from '../controller/userController.js';
const router = express.Router();


// router.post('/', (req, res) => {

//   console.log('Request body:', req.body); 
 
  
//   res.json({ message: 'User data received', data: req.body });
// });

router.post('/',registerUser);
router.get('/:id', getUserById);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);


export default router;

