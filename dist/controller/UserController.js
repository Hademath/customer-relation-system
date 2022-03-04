"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = void 0;
const userValidation_1 = require("../utilis/userValidation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../db/models/index"));
const crypto_1 = __importDefault(require("crypto"));
const Nodemailer_1 = require("../middlewares/Nodemailer");
const Nodemailer_2 = require("../middlewares/Nodemailer");
const { User } = index_1.default;
async function userSignUp(req, res, next) {
    try {
        const { error } = (0, userValidation_1.validateUserSignUp)(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const { firstName, lastName, userName, profilePicture, phone, email, password, confirmPassword, } = req.body;
        let checkuserEmail = await User.findOne({ where: { email: email } });
        let checkuserPhone = await User.findOne({ where: { phone: phone } });
        if (checkuserEmail)
            return res.status(400).send({ Message: "Email  already exist" });
        if (checkuserPhone)
            return res.status(400).send({ Message: " Phone Number already exist" });
        const salt = await bcrypt_1.default.genSalt(15);
        const passwordHashed = await bcrypt_1.default.hash(password, salt);
        const randomNumber = crypto_1.default.randomBytes(64).toString("hex");
        const createUser = await User.create({
            firstName,
            lastName,
            userName,
            phone,
            verificaticationToken: randomNumber,
            profilePicture,
            email,
            password: passwordHashed,
            confirmPassword,
        });
        // Confirm that the email has been sent to the user
        Nodemailer_1.transporter.sendMail((0, Nodemailer_2.emailVerification)(email, createUser), (error, info) => {
            if (error) {
                return res.status(400).json(error.message);
            }
            else {
                res.send({ message: "Verification email has been sent to your email account", verificaticationToken: createUser.verificaticationToken, }).status(200);
            }
        });
    }
    catch (error) {
        res.send(error);
    }
}
exports.userSignUp = userSignUp;
//# sourceMappingURL=UserController.js.map