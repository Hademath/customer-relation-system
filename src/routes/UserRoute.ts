import express  from "express";
import { emailVerified } from "../middlewares/Nodemailer";
import { login, userSignUp } from "../controller/UserController";

const router = express.Router()




router.post('/userSignUp', userSignUp) //User Registration route
router.get('/verify-email', emailVerified) // New User verification route
router.post('/login', login)    // Login  User



export default router;    
