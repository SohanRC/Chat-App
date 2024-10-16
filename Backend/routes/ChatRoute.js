import express from "express"
const router = express.Router();
import { getChats, addContact, getAllContacts } from "../controllers/ChatController.js"
import verifyToken from "../middlewares/VerifyToken.js";


router.post('/getChats', verifyToken, getChats);
router.post('/addContact', verifyToken, addContact);
router.post('/getContacts', verifyToken, getAllContacts);




export default router;