import { signin } from "../controller/authController.js";
import express from "express";
import verifyAuth from "../middleware/verifyAuth.js";
const router = express.Router();

router.post('/',signin );

router.get('api', verifyAuth);

export default router;