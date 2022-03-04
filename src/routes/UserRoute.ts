import express  from "express";
import { emailVerified } from "../middlewares/Nodemailer";
import { userSignUp } from "../controller/UserController";

const router = express.Router()




router.post('/userSignUp', userSignUp) //User Registration route
router.get('/verify-email', emailVerified) // New User verification route




export default router;    
