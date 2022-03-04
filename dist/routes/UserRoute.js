"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Nodemailer_1 = require("../middlewares/Nodemailer");
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.post('/userSignUp', UserController_1.userSignUp); //User Registration route
router.get('/verify-email', Nodemailer_1.emailVerified); // New User verification route
exports.default = router;
//# sourceMappingURL=UserRoute.js.map