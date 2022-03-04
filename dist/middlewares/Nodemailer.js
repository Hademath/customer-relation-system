"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerified = exports.emailVerification = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = __importDefault(require("../db/models/index"));
const { User } = index_1.default;
//Setup email verification variables by intializing nodemailer transporter
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
//Send the email from the Nodemailer seteup using email been created
const emailVerification = (req, createUser) => {
    const validationEmail = {
        from: " 'Email Verification' <noreplyTimeisNow247@gmail.com> ",
        to: createUser.email,
        subject: "Customer Relation Mnangement - Email Verification",
        html: `<h2> ${createUser.firstName}! Thank you for choosen CRM </h2>
      <h3>Please verify your email to complete the registration...</h3>
      Kindly click this <a href="http://localhost:7700/users/verify-email?token=${createUser.verificaticationToken}"><b>Link</b></a>`,
    };
    return validationEmail;
};
exports.emailVerification = emailVerification;
// Check if the user is verified with the verification link that was sent to the user
const emailVerified = async (req, res) => {
    try {
        const token = req.query.token;
        // Set accountVerified to true and verification token to empty string once the user is verified
        let verifyNewUser = await User.findOne({ where: { verificaticationToken: token } });
        if (!verifyNewUser)
            return res.send({ Message: "Invalid Link" });
        res.send({ Message: "You have been successfully verified" });
        verifyNewUser.verificaticationToken = "";
        verifyNewUser.accountVerified = true;
        await verifyNewUser.save();
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
exports.emailVerified = emailVerified;
//# sourceMappingURL=Nodemailer.js.map