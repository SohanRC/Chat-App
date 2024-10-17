import express from "express"
const router = express.Router();
import { getChats, addContact, getAllContacts, removeContact } from "../controllers/ChatController.js"
import verifyToken from "../middlewares/VerifyToken.js";


router.post('/getChats', verifyToken, getChats);
router.post('/addContact', verifyToken, addContact);
router.post('/removeContact', verifyToken, removeContact);
router.post('/getContacts', verifyToken, getAllContacts);




export default router;