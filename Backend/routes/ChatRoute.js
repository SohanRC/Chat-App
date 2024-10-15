import express from "express"
const router = express.Router();
import { getChats } from "../controllers/ChatController.js"
import verifyToken from "../middlewares/VerifyToken.js";


router.post('/getChats', verifyToken, getChats);




export default router;